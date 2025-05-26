import OpenAI from 'openai';


const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY ,
    dangerouslyAllowBrowser: true,
  });
  

export const requestChatGPT = async (systemPrompt: string, userInput: string) => {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: userInput
          }
        ],
        temperature: 0.6,
        max_tokens: 4000, // 충분한 응답 길이 확보
        presence_penalty: 0.4,
        frequency_penalty: 0.3,
      
      });

        const responseText = response?.choices[0]?.message?.content;
    
        return responseText;
      } catch (error) {
        console.error(error);
      }
}