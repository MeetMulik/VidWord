const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const createSummary = async (transcript: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `Summarize the following text: ${transcript}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
};
