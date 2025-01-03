import sqlite3 from 'sqlite3';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

// Path to your database file
const DATABASE_DIR = join(process.cwd(), 'database');
const DATABASE_FILE = join(DATABASE_DIR, 'miniatures.db');

export default function initDB() {
    if (!existsSync(DATABASE_DIR)) {
        mkdirSync(DATABASE_DIR, { recursive: true });
    }

    const db = new sqlite3.Database(DATABASE_FILE, (err) => {
        if (err) {
            console.error('Error Opening Database: ', err.message);
        }
        else {
            console.log('Successfully Connected to SQLite3 Database', DATABASE_FILE);
        }
    });

    db.serialize(() => {
        db.run(
            `CREATE TABLE IF NOT EXISTS brands (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                brandName TEXT UNIQUE NOT NULL,
                brandDescription TEXT
            )`,
            (err) => {
                if (err) {
                    console.error('Error Creating Brands Table: ', err.message);
                }
                else {
                    // console.log('Brands Table is Ready');
                }
            }
        );

        db.run(
            `CREATE TABLE IF NOT EXISTS games (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                brandID INTEGER NOT NULL,
                gameName TEXT NOT NULL,
                gameDescription TEXT,
                FOREIGN KEY (brandID) REFERENCES brands(id) ON DELETE CASCADE,
                UNIQUE (brandID, gameName)
            )`,
            (err) => {
                if (err) {
                    console.error('Error Creating Games Table: ', err.message);
                }
                else {
                    // console.log('Games Table is Ready');
                }
            }
        );
        
        db.run(
            `CREATE TABLE IF NOT EXISTS factions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                gameID INTEGER NOT NULL,
                factionName TEXT NOT NULL,
                factionDescription TEXT,
                FOREIGN KEY (gameID) REFERENCES games(id) ON DELETE CASCADE,
                UNIQUE (gameID, factionName)
            )`,
            (err) => {
                if (err) {
                    console.error('Error Creating Factions Table: ', err.message);
                }
                else {
                    // console.log('Factions Table is Ready');
                }
            }
        );

        db.run(
            `CREATE TABLE IF NOT EXISTS miniatures (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                factionID INTEGER NOT NULL,
                miniatureName TEXT NOT NULL,
                miniatureDescription TEXT,
                qtyUnassembled INTEGER NOT NULL DEFAULT 0,
                qtyBuilt INTEGER NOT NULL DEFAULT 0,
                qtyPrimed INTEGER NOT NULL DEFAULT 0,
                qtyPartiallyPainted INTEGER NOT NULL DEFAULT 0,
                qtyBattleReady INTEGER NOT NULL DEFAULT 0,
                qtyParadeReady INTEGER NOT NULL DEFAULT 0,
                FOREIGN KEY (factionID) REFERENCES factions(id) ON DELETE CASCADE,
                UNIQUE (factionID, miniatureName)
            )`,
            (err) => {
                if (err) {
                    console.error('Error Creating Miniatures Table: ', err.message);
                }
                else {
                    // console.log('Miniatures Table is Ready');
                }
            }
        );
    });

    return db;
};