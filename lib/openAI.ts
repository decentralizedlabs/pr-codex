import { Configuration, OpenAIApi } from "openai"

export function openAiClient() {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  })
  return new OpenAIApi(configuration)
}

export const openai = openAiClient()
