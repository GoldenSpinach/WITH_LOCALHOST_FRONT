<template>
  <div class="w-3/4 h-full flex flex-col justify-end border-s">
    <!-- 메시지 표시 영역 -->
    <div class="flex-grow p-4 overflow-y-auto">
      <div v-for="message in msgs" :key="message.msgId">
        <!-- 보낸 메시지 -->
        <div
          v-if="message.sendId === sender"
          class="w-content text-end flex justify-end"
        >
          <span class="ps-[15px] pe-[15px] bg-blue-200 text-lg rounded-lg">
            {{ message.msgContent }}
          </span>
        </div>

        <!-- 받은 메시지 -->
        <div v-else class="w-content text-start flex justify-start">
          <span class="ps-[15px] pe-[15px] bg-gray-200 text-lg rounded-lg">
            {{ message.msgContent }}
          </span>
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
import { ref, watch, onMounted, onUnmounted } from "vue";
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
      msgs.value = [...msgs.value, sendMsg[0]];
      console.log(msgs.value);
    }
  },
  { deep: true } // 객체 내부 속성 변경까지 감지
);
</script>
<style lang=""></style>
