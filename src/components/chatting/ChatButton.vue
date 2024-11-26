<template>
  <!-- 채팅 버튼 -->
  <div class="fixed bottom-[15px] right-[15px] z-50">
    <div
      class="relative primary-bg w-[70px] h-[70px] rounded-full flex items-center justify-center shadow-md hover:bg-blue-600"
      @click="toggleChatbox"
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
    v-if="chatStore.isChatBoxToggled"
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
            :src="room.userImg || '/default-profile.png'"
            alt="프로필 이미지"
          />
          <div class="truncate">
            <span class="block text-lg font-semibold neutral-text truncate">
              {{
                room.chatGuestNickName !== memberStore.memberInfo.nickname
                  ? room.chatGuestNickName
                  : room.chatGuidNickName
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
import { ref, watch } from "vue";
import ChatPannel from "@/components/chatting/ChatPannel.vue";
import { getChatRooms } from "@/api/chat";
import { stompClient } from "../../api/chat";
import { useChatStore } from "../../stores/chatStore";
import { useMemberStore } from "../../stores/member";
import { useI18n } from "vue-i18n";
import { getMe } from "../../api/member";
const { t, locale } = useI18n(); // Composition API 방식
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
  const data = await getMe();
  console.log(memberStore.memberInfo);
  rooms.value = await getChatRooms(data.userId);
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

watch(
  () => chatStore.isChatBoxToggled,
  async () => {
    if (chatStore.isChatBoxToggled) {
      await initializeWebSocket();
    } else {
      stompClient.deactivate();
    }
  }
);

const toggleChatbox = async () => {
  // if (chatStore.isChatBoxToggled) {
  //   stompClient.deactivate();
  // } else {
  //   await initializeWebSocket();
  // }
  chatStore.toggleChat();
};
const selectRoom = (id, idx) => {
  roomId.value = id;
  receiver.value =
    rooms.value[idx].chatGuidId === memberStore.memberId
      ? rooms.value[idx].chatGuestId
      : rooms.value[idx].chatGuidId;
  sender.value =
    rooms.value[idx].chatGuidId !== memberStore.memberId
      ? rooms.value[idx].chatGuestId
      : rooms.value[idx].chatGuidId;
  console.log("유저아이디: ", sender.value);
  console.log("보내는아이디: ", receiver.value);
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
