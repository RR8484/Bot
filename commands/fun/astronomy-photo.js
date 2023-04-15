const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
const { apiKey } = require('../../config.json'); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('astropic')
        .setDescription('Fetches the Astronomy Photo of the Day from NASA.'),
    async execute(interaction) {
        const endpoint = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

        try {
            const response = await axios.get(endpoint);
            const data = response.data;

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(data.title)
                .setURL(data.url)
                .setDescription(data.explanation)
                .setImage(data.url)
                .setTimestamp(new Date(data.date))
                .setFooter({ text: 'Astronomy Photo of the Day from NASA' });

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching APOD:', error);
            await interaction.reply({ content: 'An error occurred while fetching the Astronomy Photo of the Day. Please try again later.', ephemeral: true });
        };
    }
};
