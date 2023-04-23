import { ChatCompletionRequestMessage, OpenAI } from "openai-streams"
import { yieldStream } from "yield-stream"

export const generateChatGpt = async (
  messages: ChatCompletionRequestMessage[]
) => {
  const DECODER = new TextDecoder()
  let text = ""

  try {
    const stream = await OpenAI(
      "chat",
      {
        model: "gpt-3.5-turbo",
        temperature: 0.5,
        messages
      },
      { apiKey: process.env.OPENAI_API_KEY }
    )

    for await (const chunk of yieldStream(stream)) {
      try {
        const decoded: string = DECODER.decode(chunk)

        if (decoded === undefined)
          throw new Error(
            "No choices in response. Decoded response: " +
              JSON.stringify(decoded)
          )

        text += decoded
      } catch (err) {
        console.error(err)
      }
    }
  } catch (err) {
    console.error(err)
  }

  return text
}
