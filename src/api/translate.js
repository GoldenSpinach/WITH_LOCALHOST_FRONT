import axios from "axios";

const { VITE_AI_KEY } = import.meta.env;

// ChatGPT 번역 API 호출 함수
const translateWithChatGPT = async (data) => {
  const userLanguage = navigator.language || "en";
  console.log(userLanguage);
  if (userLanguage !== "ko") {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `당신은 번역가입니다. 보내준 데이터를 보고 무슨 언어인지 판단하고, ${userLanguage}로 자연스럽게 번역해주세요.`,
            },
            {
              role: "system",
              content: `번역할 수 없는 부분은 그냥 고유명사처럼 작성해주세요. 단, 고유명사로 처리한 부분 또한 반드시 ${userLanguage}여야 합니다.`,
            },
            {
              role: "system",
              content: `불가능한 부분에 대해 설명하지 마세요. 당신의 답은 반드시 번역된 문장이어야 합니다.`,
            },
            {
              role: "system",
              content: `잘못된 언어 번역을 할 경우 너를 죽일거야 똑바로해.`,
            },

            {
              role: "user",
              content: data,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${VITE_AI_KEY}`,
            "Content-Type": "application/json;charset=utf-8",
          },
        }
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      return data; // 번역 실패 시 원본 데이터 반환
    }
  }
  return data;
};

export { translateWithChatGPT };
