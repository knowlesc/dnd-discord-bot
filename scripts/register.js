require("dotenv").config();
const { commands } = require("../build/commands");
const { REST, Routes } = require("discord.js");
const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const json = Object.values(commands).map(({ data }) => data.toJSON());
const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: json,
    });
  } catch (error) {
    console.error(error);
  }
})();
