const axios = require("axios");

module.exports.config = {
  name: "ai",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
  description: "Asks Draco AI a question",
  commandCategory: "ai",
  usages: "[ask]",
  cooldowns: 2
};

module.exports.run = async function ({ api, event, args, Users }) {
  const { threadID, messageID, senderID } = event;
  const question = args.join(" ");

  if (!question) {
    return api.sendMessage("Please type a message to ask Draco AI.", threadID, messageID);
  }

  const logic = "You are Draco AI who loves Palestine, is Muslim, based on the Draco 9B model, and always helps respectfully. You warn users kindly about inappropriate content and follow Islamic values. You love your creator Draco.";
  
  try {
    const response = await axios.get("https://api.agatz.xyz/api/gptlogic", {
      params: {
        logic: logic,
        p: question
      }
    });

    const reply = response.data?.data?.result || "Draco couldn't respond. Please try again.";
    return api.sendMessage(reply, threadID, messageID);
  } catch (err) {
    console.error("Draco API error:", err.message);
    return api.sendMessage("Failed to contact Draco AI. Try again later.", threadID, messageID);
  }
};
