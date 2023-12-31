import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function(req, res) {
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "No API key found" });
  }

  const animal = req.body?.animal || "";
  if (animal.trim().length === 0) {
    res.status(400).json({ error: {message:"Please enter a valid animal"} });
    return;
  }
  try {
    const completion =  await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role:"user", content: `Suggest three pet names for the following animal: ${animal}`}],
    });

    res.status(200).json({result: completion.choices[0].message.content});

  } catch (error) {
    if( error.response ) {
      res.status(error.response.status).json({ error: error.response.data });
      console.log(error.response.data);
    } else {
      res.status(500).json({ error: error.message });
      console.log(error.message);
    }
  }
}

