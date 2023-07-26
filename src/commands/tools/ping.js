require("dotenv").config();
const { chatgpt } = process.env;
const axios = require("axios");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("return ping")
    .addStringOption((option) =>
      option
        .setName("ping")
        .setDescription("The user input")
        .setRequired(false)
    ),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const userMessage = interaction.options.getString("ping");
    const answer = `🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`

    await interaction.editReply({
          content: answer,
    }); 
  },
};
