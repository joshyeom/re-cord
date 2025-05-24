import OpenAI from 'openai';


const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY ,
    dangerouslyAllowBrowser: true,
  });
  

export const requestChatGPT = async (systemPrompt: string, userTemplate: string) => {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: userTemplate
          }
        ],
        temperature: 0.6,
        max_tokens: 4000, // 충분한 응답 길이 확보
        presence_penalty: 0.1,  // 반복 감소
        frequency_penalty: 0.1  // 다양한 표현 유도
      
      });

        const responseText = response?.choices[0]?.message?.content;
    
        return responseText;
      } catch (error) {
        console.error(error);
      }
}