const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randomjoke')
        .setDescription('Fetches a random joke.'),

    async execute(interaction) {
        try {
            const response = await axios.get('https://v2.jokeapi.dev/joke/Miscellaneous,Dark,Spooky?blacklistFlags=political,racist,sexist');
            const joke = response.data;

            let jokeText = '';
            if (joke.type === 'single') {
                jokeText = joke.joke;
            } else {
                jokeText = `${joke.setup}\n\n${joke.delivery}`;
            }

            await interaction.reply(jokeText);
        } catch (error) {
            console.error('Error fetching joke:', error);
            await interaction.reply('Failed to fetch a joke. Please try again later.');
        }
    }
}





