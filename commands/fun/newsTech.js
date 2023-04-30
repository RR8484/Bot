const { newsApi } = require('../../config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dailynews-tech')
    .setDescription('Get daily news headlines'),
  async execute(interaction) {
    const newsUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${newsApi}`;

    try {
      const response = await axios.get(newsUrl);
      const newsData = response.data;

      if (newsData.status === 'ok' && newsData.articles.length > 0) {
        const newsHeadlines = newsData.articles.slice(0, 5).map((article, index) => {
          return `**${index + 1}. [${article.title}](${article.url})**\n${article.description}\n`;
        });

        await interaction.reply(`**Top 5 Daily Tech News Headlines:**\n\n${newsHeadlines.join('\n')}`);
      } else {
        await interaction.reply('Unable to fetch daily news at the moment. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      await interaction.reply('Error fetching daily news. Please try again later.');
    }
  },
};