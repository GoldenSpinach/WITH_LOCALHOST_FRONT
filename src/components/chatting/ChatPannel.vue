<template>
  <div
    class="w-3/4 h-full p-[20px] border border-gray-200 bg-gray-50 flex flex-col justify-between rounded-xl shadow-md"
  >
    <!-- 메시지 표시 영역 -->
    <div
      ref="messageContainer"
      class="flex-grow p-4 overflow-y-auto flex flex-col gap-[15px] bg-white rounded-lg"
    >
      <div v-for="message in msgs" :key="message.msgId">
        <!-- 보낸 메시지 -->
        <div
          v-if="message.sendId === sender"
          class="w-full text-end flex flex-col items-end"
        >
          <div class="flex items-end justify-end gap-[5px] w-full">
            <span class="text-xs text-gray-400 mt-1">
              {{ formatTime(message.msgSendTime) }}
            </span>
            <span
              class="block px-[15px] py-[10px] bg-blue-500 text-white text-base rounded-lg max-w-[70%] break-words shadow-md"
            >
              {{ message.msgContent }}
            </span>
          </div>
        </div>

        <!-- 받은 메시지 -->
        <div v-else class="w-full text-start flex flex-col items-start">
          <div class="flex items-end justify-start gap-[5px] w-full">
            <span
              class="block px-[15px] py-[10px] bg-gray-200 text-gray-800 text-base rounded-lg max-w-[70%] break-words shadow-md"
            >
              {{ message.msgContent }}
            </span>
            <span class="text-xs text-gray-400 mt-1">
              {{ formatTime(message.msgSendTime) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 메시지 입력 영역 -->
    <div
      class="flex w-full p-3 items-center gap-3 bg-white rounded-lg mt-4 shadow-sm"
    >
      <input
        class="py-[12px] px-[15px] w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm"
        type="text"
        v-model="newMsg"
        :placeholder="t('메시지를 입력하세요')"
        @keyup.enter="sendMessage"
      />
      <button
        class="py-[10px] px-[15px] bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all w-[70px]"
        @click="sendMessage"
      >
        전송
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from "vue";
import { stompClient } from "@/api/chat";
import { getChatLogs } from "@/api/chat";
import { translateWithChatGPT } from "@/api/translate";
import { useI18n } from "vue-i18n";
const { t } = useI18n(); // 번역 함수 추가

const props = defineProps({
  roomId: String,
  chatLogs: Object,
  receiver: String,
  sender: String,
});

const msgs = ref([]);
const newMsg = ref("");
const messageContainer = ref(null); // 메시지 컨테이너를 참조할 ref

// 메시지 추가 후 스크롤을 맨 아래로 이동하는 함수
const scrollToBottom = () => {
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
  }
};

// 시간 형식을 시:분만 반환하도록 가공
const formatTime = (time) => {
  if (!time) return "";
  return time.split(":").slice(0, 2).join(":"); // "시:분" 형태로 변환
};

// 메시지 번역 함수
const translateMessages = async (messages) => {
  for (const message of messages) {
    if (message.msgContent) {
      message.msgContent = await translateWithChatGPT(message.msgContent);
    }
  }
};

const sendMessage = () => {
  if (!newMsg.value.trim()) return;

  // 현재 날짜와 시간을 생성
  const now = new Date();
  const date = now.toISOString().split("T")[0]; // yyyy-mm-dd 형식
  const time = now.toTimeString().split(" ")[0]; // HH:mm:ss 형식

  // 서버에 전달할 메시지 데이터 생성
  const messagePayload = {
    sendId: props.sender, // 발신자 ID
    chatRoomId: props.roomId, // 채팅방 ID
    msgContent: newMsg.value, // 메시지 내용
    msgSendDate: date, // 메시지 전송 날짜
    msgSendTime: time, // 메시지 전송 시간
    receiver: props.receiver, // 수신자 (단일 채팅인 경우 설정 가능)
  };

  // STOMP를 통해 메시지 전송
  stompClient.publish({
    destination: `/pub/send`, // 서버의 메시지 맵핑 경로
    body: JSON.stringify(messagePayload),
  });

  // 전송 후 입력 필드 초기화
  newMsg.value = "";
};

watch(
  () => props.roomId,
  async () => {
    if (props.roomId !== null) {
      msgs.value = await getChatLogs(props.roomId);
      await translateMessages(msgs.value); // 메시지 번역
      nextTick(() => scrollToBottom()); // 메시지 로드 후 스크롤 이동
    }
  }
);

watch(
  () => props.chatLogs,
  async () => {
    if (props.chatLogs[props.roomId]) {
      const sendMsg = props.chatLogs[props.roomId];

      // 새로 추가된 메시지만 번역
      const newMessage = sendMsg[sendMsg.length - 1];
      if (newMessage) {
        newMessage.msgContent = await translateWithChatGPT(
          newMessage.msgContent
        );
      }

      msgs.value = [...msgs.value, newMessage];
      nextTick(() => scrollToBottom()); // 메시지 추가 후 스크롤 이동
    }
  },
  { deep: true } // 객체 내부 속성 변경까지 감지
);

onMounted(async () => {
  msgs.value = await getChatLogs(props.roomId);
  await translateMessages(msgs.value); // 초기 메시지 번역
  nextTick(() => scrollToBottom()); // 컴포넌트 로드 시 스크롤 이동
});
</script>
<style scoped>
/* 스크롤바 스타일 */
div[ref="messageContainer"]::-webkit-scrollbar {
  width: 6px;
}
div[ref="messageContainer"]::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 3px;
}
div[ref="messageContainer"]::-webkit-scrollbar-track {
  background: #f3f4f6;
}
</style>
