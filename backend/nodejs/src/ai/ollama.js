import ollama from "ollama";

const response = await ollama.chat({
  model: "llama3:latest",
  messages: [{ role: "user", content: "Why is the sky blue?" }],
});
console.log("ollama");

console.log(response.message.content);
