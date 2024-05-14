// npm i @google/generative-ai dotenv
// https://ai.google.dev/gemini-api/docs/get-started/node?hl=ko

import { GoogleGenerativeAI } from "@google/generative-ai";
import { getEnv } from "../utils/env.js";
const { GOOGLE_API_KEY } = getEnv();

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello, I have 2 dogs in my house." }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  const msg = "How many paws are in my house?";

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
