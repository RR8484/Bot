const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('help')
      .setDescription('List all available commands'),
  
      async execute(interaction) {
        const commands = interaction.client.commands;
        const fields = [];
      
        commands.forEach((command) => {
          fields.push({ name: command.data.name, value: command.data.description });
        });
      
        const embed = new EmbedBuilder()
          .setTitle('Available Commands')
          .setColor('#1E90FF')
          .addFields(fields);
      
        await interaction.reply({ embeds: [embed] });
      }
      
  };
  
