-- Create markets table
CREATE TABLE markets
(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    lat DOUBLE PRECISION,
    lon DOUBLE PRECISION,
    neighborhood TEXT,
    opening_hours JSONB
);

-- Create footfall table
CREATE TABLE footfall
(
    id SERIAL PRIMARY KEY,
    market_id INT REFERENCES markets(id),
    timestamp TIMESTAMPTZ NOT NULL,
    visitors_count INT NOT NULL,
    source TEXT
);

-- Create indices for better query performance
CREATE INDEX idx_footfall_market_timestamp ON footfall(market_id, timestamp);

-- Insert sample market data
INSERT INTO markets
    (id, name, lat, lon, neighborhood)
VALUES
    (1, 'Main Market', 28.6139, 77.2090, 'Central Delhi'),
    (2, 'Dilli Haat', 28.5730, 77.2090, 'South Delhi'),
    (3, 'Sarojini Nagar', 28.5778, 77.1960, 'South West Delhi');