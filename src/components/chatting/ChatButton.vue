<template>
  <!-- 채팅 버튼 -->
  <div class="fixed bottom-[15px] right-[15px]">
    <div
      class="relative primary-bg w-[70px] h-[70px] rounded-full flex items-center justify-center shadow-md hover:bg-blue-600"
      @click="isChatBoxToggled = !isChatBoxToggled"
    >
      <img class="w-[35px]" src="@/assets/images/chat.svg" alt="채팅" />
      <span
        v-if="rooms.some((room) => room.hasNewMessage)"
        class="absolute top-[-5px] right-[-5px] bg-red-500 text-white text-xs rounded-full w-[20px] h-[20px] flex items-center justify-center"
      >
        !
      </span>
    </div>
  </div>

  <!-- 채팅 패널 -->
  <div
    v-if="isChatBoxToggled"
    class="w-3/4 max-w-[1150px] h-[700px] bg-neutral-bg rounded-lg fixed shadow-2xl end-[25px] bottom-[100px] z-50 flex overflow-hidden"
  >
    <!-- 방 목록 -->
    <div class="w-1/4 h-full bg-white border-r panel-divider">
      <span class="section-title primary-text p-4 border-b">채팅 목록</span>
      <div
        v-for="(room, idx) in rooms"
        :key="room.chatRoomId"
        @click="selectRoom(room.chatRoomId, idx)"
        class="flex flex-col gap-md px-4 py-3 cursor-pointer hover:bg-gray-100"
      >
        <div class="flex items-center gap-md">
          <img
            class="w-[40px] h-[40px] rounded-full bg-gray-200"
            :src="room.profileImage || '/default-profile.png'"
            alt="프로필 이미지"
          />
          <div class="truncate">
            <span class="block text-lg font-semibold neutral-text truncate">
              {{
                room.chatGuidId === userId ? room.chatGuestId : room.chatGuidId
              }}
            </span>
            <span class="body-text neutral-text truncate">
              {{ room.lastMessage }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 채팅 패널 구역 -->
    <ChatPannel
      class="w-3/4 h-full bg-white"
      :roomId="roomId"
      :chatLogs="chattings"
      :receiver="receiver"
      :sender="sender"
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
<style>
/* 새 메시지 뱃지 스타일 */
span.badge {
  animation: bounce 1s infinite;
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(-3px);
  }
  50% {
    transform: translateY(0);
  }
}
</style>
