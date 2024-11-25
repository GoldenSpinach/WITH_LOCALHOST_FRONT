import { Client } from "@stomp/stompjs";
import { accessClient } from "@/api/client";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const { VITE_CHAT_BASE } = import.meta.env;

const stompClient = new Client({
  brokerURL: VITE_CHAT_BASE,
});

const getChatRooms = async (memberId) => {
  try {
    const res = await accessClient.get(`/chat/chatroomList?userId=${memberId}`);
    return res.data;
  } catch (err) {
    toast("다시 시도해주세요");
    return [];
  }
};

const getChatLogs = async (roomId) => {
  try {
    const res = await accessClient.get(`/chat/chatList?chatRoomId=${roomId}`);
    return res.data;
  } catch (err) {
    toast("다시 시도해주세요");
    return [];
  }
};

const openChatRoom = async (guidId, guestId) => {
  try {
    const res = await accessClient.post(`/chat/createchatroom`, {
      chatGuidId: guidId,
      chatGuestId: guestId,
    });
    return res.data;
  } catch (err) {
    toast("다시 시도해주세요");
    return [];
  }
};
export { stompClient, getChatRooms, getChatLogs, openChatRoom };
