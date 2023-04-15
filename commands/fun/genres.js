const genres = require('../../genre-data');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('genres')
    .setDescription('Generate a random combination of two genres.'),
  async execute(interaction) {
    const genresMashup = combineTwoRandomGenres();
    await interaction.reply(`Random Genres: ${genresMashup}`);

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomGenre() {
        const randomNumber = getRandomInt(1, 70);
        for (const genre in genres) {
          if (genres[genre] === randomNumber) {
            return genre;
          }
        }
    };

    function combineTwoRandomGenres() {
        const genre1 = getRandomGenre();
        const genre2 = getRandomGenre();
        return genre1 + ' + ' + genre2;
    };

  
  },
};
