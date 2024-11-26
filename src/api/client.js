import axios from "axios";
import { translateWithChatGPT } from "./translate";

const { VITE_API_BASE } = import.meta.env;

const client = axios.create({
  baseURL: VITE_API_BASE,
  timeout: 1000,
  headers: { "Content-Type": "application/json;charset=uft-8" },
});

const accessClient = axios.create({
  baseURL: VITE_API_BASE,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

// 요청 인터셉터 추가
accessClient.interceptors.request.use(
  (config) => {
    // localStorage에서 accessToken 가져오기
    const accessToken = localStorage.getItem("accessToken");

    // accessToken이 있으면 Authorization 헤더 추가
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config; // 수정된 config 반환
  },
  (error) => {
    // 요청 에러 처리
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가 (필요 시)
accessClient.interceptors.response.use(
  (response) => {
    // 응답 헤더에서 Authorization 토큰을 가져옴
    const authorizationHeader = response.headers["authorization"]; // 소문자로 접근
    console.log("Authorization Header:", authorizationHeader);

    if (authorizationHeader) {
      // "Bearer " 접두사를 제거하고 액세스 토큰만 저장
      const accessToken = authorizationHeader.replace("Bearer ", "");
      console.log("Access Token:", accessToken);
      localStorage.setItem("accessToken", accessToken);
    }

    return response; // 원래 응답을 그대로 반환
  },
  (error) => {
    // 응답에서 오류가 발생했을 때 수행할 작업
    return Promise.reject(error);
  }
);

const addResponseInterceptor = (client) => {
  client.interceptors.response.use(
    async (response) => {
      // 영어로 설정된 경우 번역하지 않음
      // if (userLanguage === "ko") {
      //   return response;
      // }

      // 응답 데이터 번역 처리
      // if (response.data) {
      //   response.data = await translateWithChatGPT(response.data, "userLanguage");
      // }
      if (response.data) {
        console.log("work!");
        response.data = await translateWithChatGPT(response.data, "일본어");
      }

      return response;
    },
    (error) => Promise.reject(error)
  );
};

// addResponseInterceptor(client);
// addResponseInterceptor(accessClient);
export { client, accessClient };
