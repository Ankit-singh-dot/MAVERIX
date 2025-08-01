import { NextResponse } from "next/server";
import { generateText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { json } from "stream/consumers";
const openrouter: any = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY || "",
});
const clarifyResearchGoals = async (topic: string) => {
  const prompt = `
You are an expert research assistant. Your task is to deeply understand the user's research topic and clarify it into actionable research goals.

<topic>"${topic}<topic/>

Please provide:
1. A brief summary of the topic in simple terms.
2. 3-5 specific, well-defined research goals that someone should focus on.
3. Follow-up questions to help refine the research direction if needed.

Format your answer as:
Summary:
Goals:
Follow-up Questions:
  `;
  try {
    const { text } = await generateText({
      model: openrouter("google/gemma-3-4b-it:free"),
      prompt,
    });
  } catch (error) {
    console.log("Error while generating the code", error);
  }
};
export async function POST(req: Request) {
  const { topic } = await req.json();
  console.log("Topic", topic);
  try {
    const questions = await clarifyResearchGoals(topic);
    console.log("Questions", questions);
  } catch (error) {
    console.log("Error while generating the question", error);
  }
  return NextResponse.json(
    {
      success: true,
    },
    { status: 200 }
  );
}
