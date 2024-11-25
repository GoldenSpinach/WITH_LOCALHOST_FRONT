<template>
  <input type="text" v-model="userId" />
  <div v-if="chatStore.isChatBoxToggled"
    class="w-3/4 max-w-[1150px] h-[1000px] bg-slate-200 rounded-md fixed shadow-2xl end-[25px] bottom-[100px] z-50 flex">
    <div class="w-1/4 h-full">
      <span class="block text-xl ps-[15px] pt-[15px]">채팅</span>
      <div v-for="(room, idx) in rooms" :key="room.chatRoomId" @click="selectRoom(room.chatRoomId, idx)"
        class="flex flex-col gap-[10px] p-[15px] cursor-pointer hover:bg-slate-300">
        <span class="block text-2xl w-full truncate">{{
          room.chatGuidId === memberStore.memberId ? room.chatGuestId : room.chatGuidId
        }}</span>
        <span class="ms-[5px] truncate w-full block">{{
          room.lastMessage
        }}</span>
      </div>
    </div>
    <div class="h-full border-black w-1px"></div>
    <ChatPannel v-if="roomId != null" :roomId="roomId" :chatLogs="chattings" :receiver="receiver" :sender="sender" />
  </div>
  <div class="fixed bottom-[15px] right-[15px] cursor-pointer">
    <img class="w-[75px] cursor-pointer" src="@/assets/images/chat.svg" alt="채팅" @click="toggleChatbox" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import ChatPannel from "@/components/chatting/ChatPannel.vue";
import { getChatRooms } from "@/api/chat";
import { stompClient } from "../../api/chat";
import { useChatStore } from "../../stores/chatStore";
import { useMemberStore } from "../../stores/member";
const roomId = ref(null);
const rooms = ref([]);
const chattings = ref({});
const sender = ref("");
const receiver = ref("");
const chatStore = useChatStore();
const memberStore = useMemberStore();
const userId = ref("");
const initializeWebSocket = async () => {
  stompClient.connectHeaders = {
    userId: memberStore.memberId, // 헤더에 사용자 ID 추가
  };
  rooms.value = await getChatRooms(memberStore.memberId);
  stompClient.onConnect = () => {
    console.log("WebSocket 연결 성공");

    // 방 목록의 각 방을 구독
    rooms.value.forEach((room) => {
      subscribeToRoom(room.chatRoomId);
    });
  };

  stompClient.onDisconnect = () => {
    console.log("WebSocket 연결 해제");
  };

  stompClient.activate();
};

const subscribeToRoom = (roomId) => {
  stompClient.subscribe(`/sub/chat/room/${roomId}`, (message) => {
    const receivedMessage = JSON.parse(message.body);
    if (!chattings.value[roomId]) {
      chattings.value[roomId] = [];
    }
    chattings.value[roomId].push(receivedMessage);
    // 방 목록의 최근 메시지 업데이트 (반응형)
    const roomIndex = rooms.value.findIndex(
      (room) => room.chatRoomId === roomId
    );
    if (roomIndex !== -1) {
      // Vue의 반응형 배열 메서드 사용
      rooms.value[roomIndex] = {
        ...rooms.value[roomIndex],
        lastMessage: receivedMessage.msgContent, // 최근 메시지 업데이트
      };
    }
  });
};

const toggleChatbox = async () => {
  if (chatStore.isChatBoxToggled) {
    stompClient.deactivate();
  } else {
    await initializeWebSocket();
  }
  chatStore.toggleChat();
}
const selectRoom = (id, idx) => {
  roomId.value = id;
  receiver.value = rooms.value[idx].chatGuidId === memberStore.memberId ? rooms.value[idx].chatGuestId : rooms.value[idx].chatGuidId;
  sender.value = rooms.value[idx].chatGuidId !== memberStore.memberId ? rooms.value[idx].chatGuestId : rooms.value[idx].chatGuidId;
  console.log("유저아이디: ", sender.value)
  console.log("보내는아이디: ", receiver.value)
  // if (rooms.value[idx].chatGuidId !== userId.value) {
  //   sender.value = userId.value;
  //   receiver.value = rooms.value[idx].chatGuidId;
  // } else {
  //   receiver.value = userId.value;
  //   sender.value = rooms.value[idx].chatGuidId;
  // }
};

// onMounted(async () => {
//   console.log(memberStore.memberId)
//   rooms.value = await getChatRooms(memberStore.memberId);
//   rooms.value.forEach((room) => (chattings.value[room.chatRoomId] = []));
//   // initializeWebSocket();
// });
</script>
<style></style>
