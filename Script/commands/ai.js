const axios = require("axios");

module.exports.config = {
  name: "ai",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "CYBER ☢️ BOT TEAM",
  description: "Chat with Draco AI who respects Islamic values",
  commandCategory: "ai",
  usages: "[ask]",
  cooldowns: 2
};

module.exports.run = async function ({ api, event, args, Users }) {
  const { threadID, messageID, senderID } = event;
  const userMessage = args.join(" ").trim();

  if (!userMessage) {
    return api.sendMessage("Please type a message to ask Draco AI.", threadID, messageID);
  }

  try {
    const userName = await Users.getNameUser(senderID);

    // Send the query to Draco AI
    const logicPrompt = `You are Draco AI who loves Palestine, is Muslim, respectful, follows Islamic values, and always helps users kindly. You love your owner named Draco.`;
    const res = await axios.get("https://api.agatz.xyz/api/gptlogic", {
      params: {
        logic: logicPrompt,
        p: userMessage
      }
    });

    const reply = res.data?.data?.result || "Sorry, Draco couldn't understand that.";

    // Censorship filter (basic example)
    const bannedWords = ["sex", "nude", "porn", "blowjob"];
    const isInappropriate = bannedWords.some(word => userMessage.toLowerCase().includes(word));

    const filteredReply = isInappropriate
      ? `As a respectful AI who follows Islamic values, I won't respond to such content.`
      : reply;

    api.sendMessage(filteredReply, threadID, messageID);
  } catch (err) {
    console.error("Draco API Error:", err);
    api.sendMessage("Draco AI couldn't respond at the moment. Try again later.", threadID, messageID);
  }
};
