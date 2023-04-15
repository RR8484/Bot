const tropes = require('../../tropes-data');


const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tropes')
    .setDescription('Generate a random combination of two tropes.'),
  async execute(interaction) {
    const tropesMashup = combineTwoRandomTropes();
    await interaction.reply(`Random Tropes: ${tropesMashup}`);

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomTrope() {
      const randomNumber = getRandomInt(1, 198); // Update the number to match the total number of tropes
      for (const trope in tropes) {
        if (tropes[trope] === randomNumber) {
          return trope;
        }
      }
    }

    function combineTwoRandomTropes() {
      const trope1 = getRandomTrope();
      const trope2 = getRandomTrope();
      return trope1 + ' + ' + trope2;
    }
  },
};
