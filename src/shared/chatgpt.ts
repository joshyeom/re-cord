import OpenAI from 'openai';


const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY ,
    dangerouslyAllowBrowser: true,
  });
  

export const requestChatGPT = async (prompt: string) => {
    try {
        const response = await openai.chat.completions.create({
          model: 'gpt-4-turbo',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 1000,
        });
    
        const responseText = response?.choices[0]?.message?.content;
    
        return responseText;
      } catch (error) {
        console.error(error);
      }
}