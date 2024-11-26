import axios from "axios";

const { VITE_AI_KEY } = import.meta.env;

// ChatGPT 번역 API 호출 함수
const translateWithChatGPT = async (data) => {
  const userLanguage = navigator.language || "en";
  console.log(userLanguage);
  if (userLanguage !== "ko" && userLanguage !== "ko-KR") {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `"당신은 번역가로 지정되었습니다. 주어진 데이터를 분석하여 무슨 언어인지 정확히 판단한 뒤, 반드시 ${userLanguage}로 자연스럽고 명확하게 번역해주세요.

                      번역 규칙:

                        번역이 불가능하거나 고유명사인 경우, 기존 원문을 그대로 반환하세요.
                        번역할 수 없는 경우에도 사과, 변명 또는 모르는 내용을 작성하지 마세요.
                        반환 값은 반드시 요청된 ${userLanguage}로 번역된 문장이거나 원문 그대로여야 합니다.
                        번역된 결과 또는 원문 외에는 다른 텍스트를 포함하지 마세요.
                        번역이 어려운 경우, 원문 그대로 반환하세요.
                        문법적 오류나 부자연스러운 표현 없이, 가능한 한 가장 자연스럽게 작성하세요.
                        중요 사항:

                        규칙을 따르지 않는 경우, 결과는 사용되지 않을 것이며 번역 정확성을 엄격히 평가받습니다.
                        입력 데이터의 무결성을 유지하면서 정확하게 작업을 수행하세요.
                        추가 주의사항:

                        번역 결과는 반드시 ${userLanguage} 문법에 완벽히 부합해야 합니다.
                        입력된 데이터에 고유명사가 포함되어 있더라도, 해당 언어의 문맥에 맞게 자연스럽게 조합하세요.
                        이 규칙을 철저히 준수하여 요청을 처리하세요."`,
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
