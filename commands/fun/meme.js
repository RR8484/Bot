const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Fetch a random meme.'),
	async execute(interaction) {
		try {
			await interaction.deferReply();

			const response = await axios.get('https://api.imgflip.com/get_memes');

			if (!response.data) {
				await interaction.editReply({ content: 'Failed to fetch a meme. Please try again later.', ephemeral: true });
				return;
			}

			const memeArray = response.data.data.memes;
			const memeData = memeArray[Math.floor(Math.random() * memeArray.length)];

			// Store the template ID when you fetch the meme
			interaction.client.currentMemeTemplateId = memeData.id;

			const embed = new EmbedBuilder()
				.setTitle(memeData.name)
				.setImage(memeData.url)
				.setFooter({  text: `ID: ${memeData.id}, Width: ${memeData.width}, Height: ${memeData.height}` })
				.setColor('#1E90FF');

			await interaction.editReply({ embeds: [embed] });
		} catch (error) {
			console.error(error);
			await interaction.editReply({ content: 'An error occurred while fetching a meme. Please try again later.', ephemeral: true });
		}
	},
};
