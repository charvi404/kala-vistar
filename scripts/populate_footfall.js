
import fs from 'fs';
import csv from 'csv-parser';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function populateFootfall(filePath) {
  const rows = [];
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => rows.push(row))
      .on('end', async () => {
        try {
          console.log(`Found ${rows.length} rows to insert`);
          
          for (const row of rows) {
            await pool.query(
              'INSERT INTO footfall (market_id, timestamp, visitors_count, source) VALUES ($1, $2, $3, $4)',
              [parseInt(row.market_id), row.timestamp, parseInt(row.visitors_count), row.source]
            );
          }
          
          console.log('Footfall data populated successfully');
          resolve();
        } catch (error) {
          console.error('Error populating footfall data:', error);
          reject(error);
        } finally {
          await pool.end();
        }
      })
      .on('error', reject);
  });
}

// Run the population
populateFootfall(process.argv[2] || 'sample_data/footfall_sample.csv')
  .then(() => {
    console.log('Data population completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });
