CREATE DATABASE anniversary_db;
USE anniversary_db;

CREATE TABLE memories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,       -- short title like "First Coffee Date"
  detail TEXT NOT NULL,              -- your long appreciation message
  coverimage VARCHAR(255) NOT NULL,  -- photo URL
  video VARCHAR(255),                -- optional video link
  likes INT DEFAULT 0                -- heart counter
);
