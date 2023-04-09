// commands/fun/meme.js

const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const util = require('util')

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
			const meme = memeArray[Math.floor(Math.random() * memeArray.length)];

			const embed = new EmbedBuilder()
				.setTitle(meme.name)
				.setImage(meme.url)
				.setFooter({ text: `ID: ${meme.id} | Width: ${meme.width} | Height: ${meme.height}` })
				.setColor('#1E90FF');

			await interaction.editReply({ embeds: [embed] });
		} catch (error) {
			console.error(error);
			await interaction.editReply({ content: 'An error occurred while fetching a meme. Please try again later.', ephemeral: true });
		}
	},
};