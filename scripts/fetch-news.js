const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = path.join(__dirname, '../data/articles.json');
const RSS_FEED = 'https://www.tagesschau.de/infoservices/alle-meldungen-100~rss2.xml'; // Reliable German News

const parser = new Parser();

async function fetchNews() {
  console.log('🌍 Fetching fresh news from Tagesschau...');
  
  try {
    const feed = await parser.parseURL(RSS_FEED);
    console.log(`📰 Found ${feed.items.length} new items.`);

    let articles = [];
    if (fs.existsSync(OUTPUT_FILE)) {
      articles = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
    }

    const newArticles = feed.items.slice(0, 10).map(item => ({
      id: `news-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: item.title,
      excerpt: item.contentSnippet || item.content?.substring(0, 100),
      content: item.content || item.contentSnippet || "Click to read more...",
      level: 'C1', // News is usually advanced
      tags: ['News', 'Tagesschau'],
      source: 'Web'
    }));

    // Merge: Add new articles to the TOP of the list
    const updatedArticles = [...newArticles, ...articles];

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(updatedArticles, null, 2));
    console.log(`✅ Added ${newArticles.length} fresh articles. Total: ${updatedArticles.length}`);

  } catch (err) {
    console.error('❌ Failed to fetch news:', err);
  }
}

fetchNews();
