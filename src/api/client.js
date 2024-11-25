import axios from "axios";

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
    // 성공적인 응답 처리
    return response;
  },
  (error) => {
    // 에러 응답 처리
    return Promise.reject(error);
  }
);

export { client, accessClient };
