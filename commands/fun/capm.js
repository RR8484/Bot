// expectedReturn.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { username, password } = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
      .setName('expectedreturn')
      .setDescription('Calculate the expected annual return for a stock')
      .addStringOption(option =>
        option.setName('ticker')
          .setDescription('The stock ticker')
          .setRequired(true))
      .addStringOption(option =>
        option.setName('country')
          .setDescription('US or Canada?')
          .setRequired(true))
      .addNumberOption(option =>
        option.setName('beta')
          .setDescription("The stock's Beta value")
          .setRequired(true)),
    async execute(interaction) {
      const ticker = interaction.options.getString('ticker');
      const country = interaction.options.getString('country').toLowerCase();
      const Bi = interaction.options.getNumber('beta');
  
      let expected_market_return = '';
      let Rf = '';
  
      if (country === 'canada') {
        Rf = 0.0310;
        expected_market_return = 0.091;
      } else {
        Rf = 0.0375;
        expected_market_return = 0.1041;
      }
  
      const expected_investment_return = Rf + Bi * (expected_market_return - Rf);
      const percentage = expected_investment_return * 100
      const ERi = percentage.toFixed(4);
  
      await interaction.reply(`The expected annual return for ${ticker} is ${percentage}%`);
    },
  };
