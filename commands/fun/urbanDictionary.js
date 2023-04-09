const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('urban')
		.setDescription('Get the Urban Dictionary definition of a specified term.')
		.addStringOption(option =>
			option.setName('term')
				.setDescription('The term to look up.')
				.setRequired(true)
		),
	async execute(interaction) {
		const term = interaction.options.getString('term');

		try {
			const response = await axios.get(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(term)}`);

			const definitions = response.data.list;

			if (definitions.length === 0) {
				await interaction.reply({ content: 'No definitions found for this term.', ephemeral: true });
				return;
			}

			const topDefinition = definitions[0];

			const embed = new EmbedBuilder()
				.setTitle(topDefinition.word)
				.setDescription(topDefinition.definition)
				.addFields([
					{ name: 'Example', value: topDefinition.example },
					{ name: 'Upvotes', value: topDefinition.thumbs_up.toString(), inline: true },
					{ name: 'Downvotes', value: topDefinition.thumbs_down.toString(), inline: true },
				])
				.setURL(topDefinition.permalink)
				.setFooter({ text: 'Powered by Urban Dictionary' })
				.setColor('#1E90FF');

			await interaction.reply({ embeds: [embed] });
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'An error occurred while fetching the definition. Please try again later.', ephemeral: true });
		}
	},
};
