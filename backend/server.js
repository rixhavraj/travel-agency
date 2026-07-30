require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Expose the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Initialize DB and ensure uploads folder exists
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));
const UPLOADS_DIR = path.join(__dirname, 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS destinations (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, state TEXT, rating REAL, price TEXT, local_img_path TEXT)`);
  db.run(`CREATE TABLE IF NOT EXISTS packages (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE, duration TEXT, price TEXT, rating REAL, highlights TEXT, local_img_path TEXT)`);
  db.run(`CREATE TABLE IF NOT EXISTS blogs (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE, date TEXT, readTime TEXT, description TEXT, local_img_path TEXT)`);
  db.run(`CREATE TABLE IF NOT EXISTS why_choose_us (id INTEGER PRIMARY KEY AUTOINCREMENT, keyword TEXT UNIQUE, local_img_path TEXT)`);
  db.run(`CREATE TABLE IF NOT EXISTS hero (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, local_img_path TEXT)`);
});

const downloadImage = async (url, filepath) => {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });
  return new Promise((resolve, reject) => {
    response.data.pipe(fs.createWriteStream(filepath))
      .on('finish', () => resolve())
      .on('error', e => reject(e));
  });
};

const fetchAndSaveUnsplash = async (unsplashQuery, filename) => {
  try {
    const unsplashRes = await axios.get('https://api.unsplash.com/search/photos', {
      params: { query: unsplashQuery, per_page: 1, orientation: 'landscape' },
      headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` }
    });

    if (unsplashRes.data.results && unsplashRes.data.results.length > 0) {
      const imgUrl = unsplashRes.data.results[0].urls.regular;
      const filepath = path.join(UPLOADS_DIR, filename);
      await downloadImage(imgUrl, filepath);
      return `/uploads/${filename}`;
    }
  } catch (error) {
    console.error(`Failed to fetch Unsplash for ${unsplashQuery}:`, error.message);
  }
  return null;
};

const SEED_DATA = {
  destinations: [
    { name: 'Kedarnath', query: 'Kedarnath temple Uttarakhand', state: 'Uttarakhand', rating: 4.9, price: '₹14,999' },
    { name: 'Badrinath', query: 'Badrinath temple India', state: 'Uttarakhand', rating: 4.8, price: '₹13,999' },
    { name: 'Nainital', query: 'Nainital lake mountains', state: 'Uttarakhand', rating: 4.7, price: '₹8,999' },
    { name: 'Mussoorie', query: 'Mussoorie hill station', state: 'Uttarakhand', rating: 4.8, price: '₹9,499' },
    { name: 'Rishikesh', query: 'Rishikesh ganga', state: 'Uttarakhand', rating: 4.9, price: '₹6,999' },
    { name: 'Jim Corbett', query: 'Jim Corbett tiger', state: 'Uttarakhand', rating: 4.6, price: '₹11,999' },
    { name: 'Auli', query: 'Auli snow skiing India', state: 'Uttarakhand', rating: 4.8, price: '₹12,499' },
    { name: 'Kainchi Dham', query: 'Uttarakhand Hindu Temple', state: 'Uttarakhand', rating: 4.9, price: '₹5,999' },
    { name: 'Tugnath', query: 'Tungnath temple snow', state: 'Uttarakhand', rating: 4.8, price: '₹10,999' },
    { name: 'Munsiyari', query: 'Munsiyari Panchachuli peaks', state: 'Uttarakhand', rating: 4.7, price: '₹13,499' }
  ],
  packages: [
    { title: 'Kedarnath Group Tour', query: 'Kedarnath himalayas', duration: '4 Nights / 5 Days', price: '₹14,999', rating: 4.9, highlights: 'Comfortable Stay|Meals Included|Expert Guide' },
    { title: 'Nainital Family Vacation', query: 'Nainital lake family', duration: '3 Nights / 4 Days', price: '₹12,499', rating: 4.8, highlights: 'Quality Accommodation|Lake Boating|Meals' },
    { title: 'Himachal Honeymoon', query: 'Manali snow mountains honeymoon', duration: '5 Nights / 6 Days', price: '₹22,999', rating: 4.7, highlights: 'Private Cab|Candlelight Dinner|Snow Trip' },
    { title: 'Rishikesh Weekend Getaway', query: 'Rishikesh adventure camping', duration: '2 Nights / 3 Days', price: '₹5,999', rating: 4.9, highlights: 'Adventure Trip|River Rafting|Camping' }
  ],
  blogs: [
    { title: 'Ranthambore: Where Royal History Meets The Wild', query: 'Ranthambore tiger', date: '10-Oct-2025', readTime: '6 min read', description: 'Plan the perfect Ranthambore adventure with insights on zones, timings, and local secrets.' },
    { title: 'Wildlife Experiences In Ranthambore', query: 'Ranthambore wildlife', date: '18-Oct-2025', readTime: '5 min read', description: 'From elusive tigers to rare birds, explore the many wild residents of Ranthambore.' },
    { title: 'Best Time To Visit Ranthambore', query: 'Ranthambore fort', date: '25-Oct-2025', readTime: '4 min read', description: 'Season-by-season guide to help you plan your Ranthambore safari just right.' }
  ],
  why_choose_us: [
    { keyword: 'Taj Mahal' },
    { keyword: 'Hawa Mahal' },
    { keyword: 'Golden Temple Amritsar' },
    { keyword: 'Kerala Backwaters' },
    { keyword: 'Varanasi Ghats' }
  ],
  hero: [
    { name: 'Himalayas Banner 1', query: 'Himalayas snow mountain sunrise' },
    { name: 'Taj Mahal Banner 2', query: 'Taj Mahal sunset architecture' },
    { name: 'Kerala Banner 3', query: 'Kerala backwaters boat nature' }
  ]
};

// Seed function to run if database is empty
const seedDatabaseIfNeeded = () => {
  return new Promise((resolve) => {
    db.get("SELECT count(*) as count FROM hero", async (err, row) => {
      if (err) return resolve();
      
      if (row.count === 0) {
        console.log("Database empty. Seeding all home data with specific Unsplash queries...");
        
        // Destinations
        for (const item of SEED_DATA.destinations) {
          const path = await fetchAndSaveUnsplash(item.query, `dest_${item.name.replace(/\s+/g, '')}.jpg`);
          db.run(`INSERT INTO destinations (name, state, rating, price, local_img_path) VALUES (?, ?, ?, ?, ?)`, [item.name, item.state, item.rating, item.price, path]);
        }
        
        // Packages
        for (const item of SEED_DATA.packages) {
          const path = await fetchAndSaveUnsplash(item.query, `pkg_${item.title.replace(/[^a-zA-Z]/g, '')}.jpg`);
          db.run(`INSERT INTO packages (title, duration, price, rating, highlights, local_img_path) VALUES (?, ?, ?, ?, ?, ?)`, [item.title, item.duration, item.price, item.rating, item.highlights, path]);
        }

        // Blogs
        for (const item of SEED_DATA.blogs) {
          const path = await fetchAndSaveUnsplash(item.query, `blog_${item.title.substring(0,10).replace(/\s+/g, '')}.jpg`);
          db.run(`INSERT INTO blogs (title, date, readTime, description, local_img_path) VALUES (?, ?, ?, ?, ?)`, [item.title, item.date, item.readTime, item.description, path]);
        }

        // Why Choose Us
        for (const item of SEED_DATA.why_choose_us) {
          const path = await fetchAndSaveUnsplash(item.keyword, `wcu_${item.keyword.replace(/\s+/g, '')}.jpg`);
          db.run(`INSERT INTO why_choose_us (keyword, local_img_path) VALUES (?, ?)`, [item.keyword, path]);
        }

        // Hero
        for (let i = 0; i < SEED_DATA.hero.length; i++) {
          const item = SEED_DATA.hero[i];
          const path = await fetchAndSaveUnsplash(item.query, `hero_${i}.jpg`);
          db.run(`INSERT INTO hero (name, local_img_path) VALUES (?, ?)`, [item.name, path]);
        }

        console.log("Seeding complete!");
      }
      resolve();
    });
  });
};

// Consolidated Home Data Endpoint
app.get('/api/home-data', async (req, res) => {
  await seedDatabaseIfNeeded();

  const getTable = (table) => new Promise((resolve) => {
    db.all(`SELECT * FROM ${table}`, (err, rows) => resolve(rows || []));
  });

  try {
    const [destinations, packages, blogs, whyChooseUs, hero] = await Promise.all([
      getTable('destinations'),
      getTable('packages'),
      getTable('blogs'),
      getTable('why_choose_us'),
      getTable('hero')
    ]);

    res.json({ destinations, packages, blogs, whyChooseUs, hero });
  } catch (error) {
    res.status(500).json({ error: 'Database read failed' });
  }
});

// Search API Endpoint (External un-cached)
app.get('/api/photos', async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: 'Query parameter is required' });

  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: { query: query, per_page: 6, orientation: 'landscape' },
      headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` }
    });
    const photos = response.data.results.map(p => ({
      id: p.id, url: p.urls.regular, thumb: p.urls.small,
      alt_description: p.alt_description, author: p.user.name, author_link: p.user.links.html
    }));
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch photos from Unsplash' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
