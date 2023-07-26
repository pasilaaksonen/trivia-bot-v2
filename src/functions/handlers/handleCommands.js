const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { guildId, clientId } = process.env;
const fs = require("fs");

module.exports = (client) => {
  // Load all commands from command folders and register them with Discord
  client.handleCommands = async () => {
    const commandFolders = await fs.promises.readdir("./src/commands");

    for (const folder of commandFolders) {
      const commandFiles = await fs.promises.readdir(
        `./src/commands/${folder}`
      );
      const { commands, commandArray } = client;

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        console.log(command)
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      }
    }

    // Register the commands with Discord
    const discordRestAPI = new REST({ version: "9" }).setToken(
      process.env.token
    );

    try {
      console.log("Started refreshing application (/) commands.");

      await discordRestAPI.put(
        Routes.applicationGuildCommands(clientId, guildId),
        {
          body: client.commandArray,
        }
      );

      console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
      console.error(error);
    }
  };
};