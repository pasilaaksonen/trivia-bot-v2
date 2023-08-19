require("dotenv").config();
const axios = require("axios");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("question")
    .setDescription("return random trivia question")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("The user input")
        .setRequired(false)
    ),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const apiUrl = 'https://opentdb.com/api.php';
    const question2 = 'aaaa';

    try {
        const response = await axios.get(apiUrl, {
          params: {
            amount: 1, // Number of questions to fetch (change this if you want more questions)
            type: 'multiple', // Type of questions (multiple choice)
          },
        });
    
        // Extract the question from the response
        question = response.data.results[0].question;
        console.log(question)
      } catch (error) {
        console.error('Error fetching trivia question:', error);
      }

    await interaction.editReply({
          content: apiUrl,
    }); 
  },
};