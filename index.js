const { Client, GatewayIntentBits } = require("discord.js");
// const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { encode, decode } = require("./shipher3");
const information = JSON.parse(process.env.INFO);
const vicove = require("./vicove.json");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// resolve=разрешавам reject=error

function wait(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "joke") {
    await interaction.reply(vicove[Math.floor(Math.random() * vicove.length)]);
  }
  if (interaction.commandName === "encode") {
    const s = interaction.options.getString("string", true);
    const key = interaction.options.getString("key", true);
    await interaction.reply({ content: encode(s, key), ephemeral: true });
  }
  if (interaction.commandName === "decode") {
    const s = interaction.options.getString("string", true);
    const key = interaction.options.getString("key", true);
    await interaction.reply({ content: decode(s, key), ephemeral: true });
  }
});
client.on("guildMemberAdd", (member) => {
  console.log(member);
});

client.login(information.TOKEN);
