const fs = require('fs');
const path = require('path');
const pdf = require('pdf-extraction');

const INPUT_DIR = path.join(__dirname, '../data/books_input');
const OUTPUT_FILE = path.join(__dirname, '../data/articles.json');

async function processBooks() {
  console.log('📚 Looking for books in:', INPUT_DIR);

  if (!fs.existsSync(INPUT_DIR)) {
    fs.mkdirSync(INPUT_DIR, { recursive: true });
    return;
  }

  const files = fs.readdirSync(INPUT_DIR);
  let newArticles = [];
  
  let currentArticles = [];
  if (fs.existsSync(OUTPUT_FILE)) {
    try {
        currentArticles = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
    } catch (e) {
        currentArticles = [];
    }
  }

  for (const file of files) {
    const filePath = path.join(INPUT_DIR, file);
    if (fs.statSync(filePath).isDirectory()) continue;

    console.log(`Processing ${file}...`);
    let text = '';

    try {
      if (file.toLowerCase().endsWith('.pdf')) {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);
        text = data.text;
      } else if (file.toLowerCase().endsWith('.txt') || file.toLowerCase().endsWith('.md')) {
        text = fs.readFileSync(filePath, 'utf8');
      } else {
        continue;
      }

      text = text.replace(/\s+/g, ' ').trim();
      if (text.length < 100) continue;

      const words = text.split(' ');
      const CHUNK_SIZE = 400; 

      let chunkCount = 0;
      for (let i = 0; i < words.length; i += CHUNK_SIZE) {
        if (i > CHUNK_SIZE * 50) break; // Increased limit for larger books

        const chunkText = words.slice(i, i + CHUNK_SIZE).join(' ');
        if (chunkText.length < 200) continue;

        const articleId = `book-${file.replace(/[^\w-]/g, '')}-${i}`;
        if (currentArticles.some(a => a.id === articleId)) continue;

        newArticles.push({
          id: articleId,
          title: `${file} (Part ${chunkCount + 1})`,
          excerpt: chunkText.substring(0, 150) + '...',
          content: chunkText,
          level: 'B2', 
          tags: ['My Library', 'Book'],
          source: 'Local File'
        });
        chunkCount++;
      }
      console.log(`   -> Created ${chunkCount} articles.`);

    } catch (err) {
      console.error(`   -> Error processing ${file}:`, err.message);
    }
  }

  if (newArticles.length > 0) {
    const finalData = [...newArticles, ...currentArticles];
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalData, null, 2));
    console.log(`✅ Successfully added ${newArticles.length} new segments!`);
  } else {
    console.log('⚠️ No new content extracted.');
  }
}

processBooks();