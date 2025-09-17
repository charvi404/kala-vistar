import fs from 'fs';
import csv from 'csv-parser';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function ingest(filePath) {
  const rows = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => rows.push(row))
    .on('end', async () => {
      for (const r of rows) {
        const { error } = await supabase.from('footfall').insert([
          {
            market_id: r.market_id,
            timestamp: r.timestamp,
            visitors_count: r.visitors_count,
            source: r.source
          }
        ]);
        if (error) console.error('Insert error:', error);
      }
      console.log('Ingestion completed');
    });
}

// Run: node scripts/ingest_footfall.js sample_data/footfall_sample.csv
ingest(process.argv[2]);
