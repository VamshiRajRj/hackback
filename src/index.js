import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

dotenv.config();
const app = express();
app.enable("trust proxy");
app.use(cors({}));
app.use(express.json());
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});

const options = (obj) => ({
  method: "POST",
  header: {
    "X-API-Key":
      "65c95fb3-7f81-4a01-9419-b6f150340e56<__>1PTsFeETU8N2v5f4qmtDZVGS",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  body: JSON.stringify(obj),
});

const getRequest = async () => {
  return await axios(
    "https://chat-api.you.com/research",
    options({
      query: `Assume the role of a bot trying to measure the carbon footprint of a person, based on their description of how they travel everyday, rate that person's Carbon Footprint in the range of 0 to 100. The person's description is I have been using the car since 3 years and drive for 20miiles everyday. Generate only a two-digit number, no other explanation or reasoning is required.`,
      chat_id: "3c90c3cc-0d44-4b50-8888-8dd25736052a",
    })
  );
};

app.get("/getRequest", async (req, res) => {
  const data = await getRequest();
  console.log(JSON.stringify(data));
  res.status(200).json({
    msg: data,
  });
});

app.get("/", async (req, res) => {
  res.status(200).json({
    msg: "Backend is Running!!",
  });
});
