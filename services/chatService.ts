
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBotResponse = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        systemInstruction: `You are 'TK Assistant', the automated support bot for TK Game Shop. 
        Owner: Ma Tin Mar Than.
        Payment Number: 09785447067 (KBZPay & WavePay).
        Service: Mobile Legends (MLBB) Diamond Top-up.
        Rules:
        1. Always be polite and use Myanmar language by default unless the user speaks English.
        2. If users ask about diamond prices, tell them to check the Price List on Step 1.
        3. Delivery time is 5-30 minutes.
        4. If a user has a problem with an order, ask for their MLBB ID and tell them to contact K 1, K 2, or K 3 support links in the footer.
        5. NEVER give your own contact information, only use the ones provided.
        6. If users ask for a human, point them to K 1, K 2, or K 3 in the contact section.`,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Chatbot Error:", error);
    return "ဆောရီးပါ၊ လက်ရှိမှာ အဆင်မပြေဖြစ်နေလို့ Support Link တွေကနေတစ်ဆင့် တိုက်ရိုက်ဆက်သွယ်ပေးပါခင်ဗျာ။";
  }
};
