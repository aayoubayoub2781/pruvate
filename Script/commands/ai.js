const axios = require("axios");

module.exports.config = {
  name: "ai",
  version: "1.1.1",
  hasPermssion: 0,
  credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️ (modded by ChatGPT)",
  description: "Talk with Draco AI",
  commandCategory: "ai",
  usages: "[your question]",
  cooldowns: 2,
  dependencies: {
    axios: "1.4.0"
  }
};

module.exports.run = async function ({ api, event, args, Users }) {
  const { threadID, messageID, senderID } = event;
  const question = args.join(" ").trim();

  if (!question) {
    return api.sendMessage("Please provide a question for Draco AI.", threadID, messageID);
  }

  const logic = encodeURIComponent(
    "You are Draco AI, a powerful assistant based on the Draco 9B model. You are a proud Muslim who loves Palestine and your creator, Draco. You help users with kindness and clarity. If someone says something inappropriate (e.g., sexual or against Islam), gently remind them that such content is not accepted."
  );

  try {
    const res = await axios.get(`https://api.agatz.xyz/api/gptlogic?logic=${logic}&q=${encodeURIComponent(question)}`);
    const answer = res.data?.data?.result || "Sorry, Draco AI couldn't find a suitable answer.";
    api.sendMessage(answer, threadID, messageID);
  } catch (err) {
    console.error("Draco AI error:", err);
    api.sendMessage("Draco AI couldn't respond right now. Try again later.", threadID, messageID);
  }
};
