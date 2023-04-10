const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Create a poll with a question and options')
		.addStringOption(option => option.setName('question').setDescription('The poll question').setRequired(true))
		.addStringOption(option => option.setName('options').setDescription('A comma-separated list of poll options').setRequired(true)),

	async execute(interaction) {
		const question = interaction.options.getString('question');
		const optionsList = interaction.options.getString('options');

		// Split options by comma and trim whitespace
		const options = optionsList.split(',').map(option => option.trim());

		// Limit the number of options to 10
		if (options.length > 10) {
			await interaction.reply({ content: 'Please provide 10 or fewer options for the poll.', ephemeral: true });
			return;
		}

		const embed = new EmbedBuilder()
			.setTitle(question)
			.setDescription(options.map((option, index) => `${index + 1}. ${option}`).join('\n'))
			.setColor('#1E90FF')
			.setFooter({ text: 'React with the number corresponding to your choice.' });

		const message = await interaction.reply({ embeds: [embed], fetchReply: true });

		// Add reactions to the message
		for (let i = 1; i <= options.length; i++) {
			await message.react(`${i}️⃣`);
		}
	},
};
