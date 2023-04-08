const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('dice')
		.setDescription('Rolls a virtual dice with a specified number of sides.')
		.addIntegerOption(option =>
			option.setName('sides')
				.setDescription('Number of sides on the dice (default: 6)')
				.setRequired(false)),
	async execute(interaction) {
		const sides = interaction.options.getInteger('sides') || 6;

		if (sides < 2) {
			return interaction.reply('The number of sides must be greater than or equal to 2.');
		}

		const roll = Math.floor(Math.random() * sides) + 1;
		const embed = new EmbedBuilder()
			.setTitle(`🎲 Dice Roll 🎲`)
			.setDescription(`You rolled a **${roll}** on a ${sides}-sided dice.`)
			.setColor('#0099ff');

		await interaction.reply({ embeds: [embed] });
	},
};
