import express from 'express';
const router = express.Router();

// Hourly footfall
router.get('/hourly', async (req, res) => {
  const { market_id, from, to } = req.query;
  const { data, error } = await req.db.query(`
    SELECT to_char(date_trunc('hour', timestamp), 'YYYY-MM-DD HH24:00') AS time,
           SUM(visitors_count) AS visitors
    FROM footfall
    WHERE market_id = $1 AND timestamp BETWEEN $2 AND $3
    GROUP BY 1 ORDER BY 1
  `, [market_id, from, to]);

  if (error) return res.status(500).json({ error });
  res.json(data.rows);
});

// Daily footfall
router.get('/daily', async (req, res) => {
  const { market_id, from, to } = req.query;
  const { data, error } = await req.db.query(`
    SELECT to_char(date_trunc('day', timestamp), 'YYYY-MM-DD') AS time,
           SUM(visitors_count) AS visitors
    FROM footfall
    WHERE market_id = $1 AND timestamp BETWEEN $2 AND $3
    GROUP BY 1 ORDER BY 1
  `, [market_id, from, to]);

  if (error) return res.status(500).json({ error });
  res.json(data.rows);
});

// Monthly footfall
router.get('/monthly', async (req, res) => {
  const { market_id, from, to } = req.query;
  const { data, error } = await req.db.query(`
    SELECT to_char(date_trunc('month', timestamp), 'YYYY-MM') AS time,
           SUM(visitors_count) AS visitors
    FROM footfall
    WHERE market_id = $1 AND timestamp BETWEEN $2 AND $3
    GROUP BY 1 ORDER BY 1
  `, [market_id, from, to]);

  if (error) return res.status(500).json({ error });
  res.json(data.rows);
});

export default router;
