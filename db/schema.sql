CREATE TABLE markets (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  lat DOUBLE PRECISION,
  lon DOUBLE PRECISION,
  neighborhood TEXT,
  opening_hours JSONB
);

CREATE TABLE footfall (
  id SERIAL PRIMARY KEY,
  market_id INT REFERENCES markets(id),
  timestamp TIMESTAMPTZ NOT NULL,
  visitors_count INT NOT NULL,
  source TEXT
);

-- Hourly
CREATE OR REPLACE FUNCTION get_hourly_footfall(market INT, start_date TIMESTAMPTZ, end_date TIMESTAMPTZ)
RETURNS TABLE (time TEXT, visitors INT) AS $$
  SELECT to_char(date_trunc('hour', timestamp), 'YYYY-MM-DD HH24:00') AS time,
         SUM(visitors_count) AS visitors
  FROM footfall
  WHERE market_id = market AND timestamp BETWEEN start_date AND end_date
  GROUP BY 1 ORDER BY 1;
$$ LANGUAGE sql;

-- Daily
CREATE OR REPLACE FUNCTION get_daily_footfall(market INT, start_date TIMESTAMPTZ, end_date TIMESTAMPTZ)
RETURNS TABLE (time TEXT, visitors INT) AS $$
  SELECT to_char(date_trunc('day', timestamp), 'YYYY-MM-DD') AS time,
         SUM(visitors_count) AS visitors
  FROM footfall
  WHERE market_id = market AND timestamp BETWEEN start_date AND end_date
  GROUP BY 1 ORDER BY 1;
$$ LANGUAGE sql;

-- Monthly
CREATE OR REPLACE FUNCTION get_monthly_footfall(market INT, start_date TIMESTAMPTZ, end_date TIMESTAMPTZ)
RETURNS TABLE (time TEXT, visitors INT) AS $$
  SELECT to_char(date_trunc('month', timestamp), 'YYYY-MM') AS time,
         SUM(visitors_count) AS visitors
  FROM footfall
  WHERE market_id = market AND timestamp BETWEEN start_date AND end_date
  GROUP BY 1 ORDER BY 1;
$$ LANGUAGE sql;
