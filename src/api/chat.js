import { Client } from "@stomp/stompjs";
import { client } from "@/api/client";
const { VITE_CHAT_BASE } = import.meta.env;

const stompClient = new Client({
  brokerURL: VITE_CHAT_BASE,
});

const getChatRooms = async (memberId) => {
  try {
    const res = await client.get(`/chat/chatroomList?userId=${memberId}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getChatLogs = async (roomId) => {
  try {
    const res = await client.get(`/chat/chatList?chatRoomId=${roomId}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const openChatRoom = async (guidId, guestId) => {
  try {
    const res = await client.post(`/chat/createchatroom`, {
      chatGuidId: guidId,
      chatGuestId: guestId,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
export { stompClient, getChatRooms, getChatLogs, openChatRoom };
