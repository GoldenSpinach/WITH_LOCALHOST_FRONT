<template>
  <div
    class="w-3/4 h-full p-[20px] border-gray-900 flex flex-col justify-end rounded-xl"
  >
    <!-- 메시지 표시 영역 -->
    <div
      ref="messageContainer"
      class="flex-grow p-4 overflow-y-auto flex flex-col gap-[15px]"
    >
      <div v-for="message in msgs" :key="message.msgId">
        <!-- 보낸 메시지 -->
        <div
          v-if="message.sendId === sender"
          class="w-full text-end flex flex-col items-end"
        >
          <div class="flex items-end justify-end gap-[5px] w-full">
            <span class="text-xs text-gray-500 mt-1">
              {{ formatTime(message.msgSendTime) }}
            </span>
            <span
              class="block ps-[15px] pe-[15px] bg-white text-xl rounded-lg max-w-[70%] break-words py-[7px]"
            >
              {{ message.msgContent }}
            </span>
          </div>
        </div>

        <!-- 받은 메시지 -->
        <div v-else class="w-full text-start flex flex-col items-start">
          <div class="flex items-end justify-start gap-[5px] w-full">
            <span
              class="block ps-[15px] pe-[15px] bg-blue-300 text-xl rounded-lg max-w-[70%] break-words py-[7px]"
            >
              {{ message.msgContent }}
            </span>
            <span class="text-xs text-gray-500 mt-1">
              {{ formatTime(message.msgSendTime) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 메시지 입력 영역 -->
    <div class="flex w-full p-2 items-center">
      <input
        class="py-[15px] px-[20px] w-[90%] rounded-md border"
        type="text"
        v-model="newMsg"
        placeholder="메시지를 입력하세요"
        @keyup.enter="sendMessage"
      />
      <img
        class="w-[10%] cursor-pointer"
        src="@/assets/images/up_arrow.svg"
        alt="메시지 전송"
        @click="sendMessage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from "vue";
import { stompClient } from "@/api/chat";
import { getChatLogs } from "@/api/chat";

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
    console.log(props.roomId);
    if (props.roomId !== null) {
      msgs.value = await getChatLogs(props.roomId);
      console.log(msgs.value);
      nextTick(() => scrollToBottom()); // 메시지 로드 후 스크롤 이동
    }
  }
);

watch(
  () => props.chatLogs,
  () => {
    console.log("업데이트 됐습니다!!!!!!!!!!!!!!!!!!!!!!");
    if (props.chatLogs[props.roomId]) {
      const sendMsg = props.chatLogs[props.roomId];
      console.log(sendMsg);
      msgs.value = [...msgs.value, sendMsg[sendMsg.length - 1]];
      console.log(msgs.value);
      nextTick(() => scrollToBottom()); // 메시지 추가 후 스크롤 이동
    }
  },
  { deep: true } // 객체 내부 속성 변경까지 감지
);

onMounted(() => {
  nextTick(() => scrollToBottom()); // 컴포넌트 로드 시 스크롤 이동
});
</script>
