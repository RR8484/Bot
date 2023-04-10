const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { username, password } = require('../../config.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('create-meme')
    .setDescription('Create a meme using the last meme template')
    .addStringOption(option => option.setName('top_text').setDescription('Top text of the meme').setRequired(false))
    .addStringOption(option => option.setName('bottom_text').setDescription('Bottom text of the meme').setRequired(false)),
  async execute(interaction) {
    const topText = interaction.options.getString('top_text') || "";
    const bottomText = interaction.options.getString('bottom_text') || "";
    
    const templateId = interaction.client.currentMemeTemplateId || '112126428';

    const response = await axios.get(`https://api.imgflip.com/caption_image?template_id=${templateId}&text0=${encodeURIComponent(topText)}&text1=${encodeURIComponent(bottomText)}&username=${username}&password=${password}`);

    if (response.data.success) {
      await interaction.reply({ content: response.data.data.url });
    } else {
      console.error(error)
      await interaction.reply({ content: 'Failed to create meme. Please try again.', ephemeral: true });
    }
  },
};

