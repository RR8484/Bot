const { SlashCommandBuilder } = require('@discordjs/builders');
const { getWeather } = require('../../getweather'); // Adjust the path to the location of your getWeather() function

module.exports = {
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Get the current weather for a specific location')
        .addStringOption(option => option.setName('location').setDescription('The location to get the weather for').setRequired(true)),
    async execute(interaction) {
        const location = interaction.options.getString('location');
        try {
            const weatherData = await getWeather(location);
            if (weatherData) {
                // Format the weather data as a string or embed, depending on your preference
                await interaction.reply(`Weather in ${location}: ${weatherData.temperature}°C, ${weatherData.weatherDescription}`);
            } else {
              await interaction.reply({ content: 'Failed to fetch weather data. Please try again.', ephemeral: true });
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'An error occurred while fetching the weather data. Please try again later.', ephemeral: true });
        }
    },
};
