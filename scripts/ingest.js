const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const SOURCE_DIR = 'C:\\Users\\karpo\\Desktop\\German';
const OUTPUT_FILE = path.join(__dirname, '../data/articles.json');

// Helper to clean text
function cleanText(text) {
  return text
    .replace(/\s+/g, ' ') // Remove excess whitespace
    .replace(/(\r\n|\n|\r)/g, ' ')
    .trim();
}

async function ingestBooks() {
  console.log(`🔍 Scanning ${SOURCE_DIR} for books...`);
  
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Source directory not found: ${SOURCE_DIR}`);
    return;
  }

  const files = fs.readdirSync(SOURCE_DIR).filter(file => file.endsWith('.pdf'));
  console.log(`📚 Found ${files.length} PDF files.`);

  let articles = [];
  
  // Load existing articles if any
  if (fs.existsSync(OUTPUT_FILE)) {
    try {
      articles = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
    } catch (e) {
      console.log('⚠️ Could not read existing data, starting fresh.');
    }
  }

  for (const file of files) {
    console.log(`📖 Processing: ${file}...`);
    const filePath = path.join(SOURCE_DIR, file);
    const dataBuffer = fs.readFileSync(filePath);

    try {
      const data = await pdf(dataBuffer);
      const fullText = cleanText(data.text);
      
      // Strategy: Split into chunks of ~300 words to create "Bite-sized" articles
      const words = fullText.split(' ');
      const chunkSize = 300;
      
      for (let i = 0; i < words.length; i += chunkSize) {
        // Only take the first 5 chunks per book to avoid overwhelming the app for now
        if (i > chunkSize * 5) break; 

        const chunk = words.slice(i, i + chunkSize).join(' ');
        if (chunk.length < 100) continue;

        articles.push({
          id: `local-${file}-${i}`,
          title: `${file.replace('.pdf', '')} - Part ${Math.floor(i/chunkSize) + 1}`,
          excerpt: chunk.substring(0, 100) + '...', 
          content: chunk,
          level: 'B2', // Assuming B2 for these books
          tags: ['Book', 'Local Library'],
          source: 'Local File'
        });
      }
    } catch (err) {
      console.error(`❌ Failed to parse ${file}:`, err.message);
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(articles, null, 2));
  console.log(`✅ Successfully saved ${articles.length} articles to data/articles.json`);
}

ingestBooks();
