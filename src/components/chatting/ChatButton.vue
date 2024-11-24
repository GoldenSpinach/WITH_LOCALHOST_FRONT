<template>
  <input type="text" v-model="userId" />
  <button @click="initializeWebSocket">vasdfasdfasdf</button>
  <div
    v-if="isChatBoxToggled"
    class="w-3/4 max-w-[1150px] h-[1000px] bg-slate-100 rounded-md fixed shadow-2xl end-[25px] bottom-[100px] z-50 flex"
  >
    <div class="w-1/4 h-full">
      <span class="text-xl">채팅 목록</span>
      <div
        v-for="(room, idx) in rooms"
        :key="room.chatRoomId"
        @click="selectRoom(room.chatRoomId, idx)"
        class="flex flex-col gap-[10px] p-[15px] cursor-pointer hover:bg-slate-300"
      >
        <span class="text-2xl">{{
          room.chatGuidId === userId ? room.chatGuestId : room.chatGuidId
        }}</span>
        <span class="ms-[5px]">{{ room.lastMessage }}</span>
      </div>
    </div>

    <ChatPannel
      :roomId="roomId"
      :chatLogs="chattings"
      :receiver="receiver"
      :sender="sender"
    />
  </div>
  <div class="fixed bottom-[15px] right-[15px] cursor-pointer">
    <img
      class="w-[75px] cursor-pointer"
      src="@/assets/images/chat.svg"
      alt="채팅"
      @click="isChatBoxToggled = !isChatBoxToggled"
    />
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import ChatPannel from "@/components/chatting/ChatPannel.vue";
import { getChatRooms } from "@/api/chat";
import { stompClient } from "../../api/chat";
const roomId = ref(null);
const rooms = ref([]);
const chattings = ref({});
const sender = ref("");
const receiver = ref("");
const isChatBoxToggled = ref(false);
const userId = ref("");
const initializeWebSocket = async () => {
  stompClient.connectHeaders = {
    userId: userId.value, // 헤더에 사용자 ID 추가
  };
  rooms.value = await getChatRooms(userId.value);
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
    // 방 목록의 최근 메시지 업데이트
    const room = rooms.value.find((room) => room.roomId === roomId);
    if (room) {
      room.lastMessage = receivedMessage.content;
    }
  });
};

const selectRoom = (id, idx) => {
  roomId.value = id;
  const ID = userId.value;
  if (rooms.value[idx].chatGuidId !== ID) {
    sender.value = ID;
    receiver.value = rooms.value[idx].chatGuidId;
  } else {
    receiver.value = ID;
    sender.value = rooms.value[idx].chatGuidId;
  }
};

onMounted(async () => {
  const id = userId.value;
  rooms.value = await getChatRooms(id);
  rooms.value.forEach((room) => (chattings.value[room.chatRoomId] = []));
  // initializeWebSocket();
});
</script>
<style></style>
