import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../../firebase";
const { VITE_PUBLIC_VAPID } = import.meta.env;
const requestNotificationPermission = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: VITE_PUBLIC_VAPID,
    });
    if (currentToken) {
      console.log("FCM 등록 토큰:", currentToken);
      // 서버에 등록 토큰을 저장
      await sendTokenToServer(currentToken);
    } else {
      console.log("푸시 알림 권한을 허용해주세요.");
    }
  } catch (error) {
    console.error("FCM 등록 토큰 가져오기 실패:", error);
  }
};

const sendTokenToServer = async (token) => {
  // 토큰을 서버로 전송하여 저장
  const { VITE_API_BASE } = import.meta.env;
  console.log("dddddaksdjfgh;aehfgohoa;erhgo;aefhogh");
  await fetch(VITE_API_BASE + "/user/fcmtoken", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: "minji123",
      //   fcmToken: token,
    }),
  });
};

onMessage(messaging, (payload) => {
  console.log("FCM 메시지 수신:", payload, Notification.permission);

  // 브라우저 알림 표시
  if (Notification.permission === "granted") {
    new Notification(payload.data.title, {
      body: payload.data.body,
    });
  }
});

export { requestNotificationPermission };
