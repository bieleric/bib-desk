import { ipcMain } from 'electron';
import sqlite3 from 'sqlite3';
import databaseConfig from './database.config.js';

export const setupDatabase = () => {
    const databasePath = databaseConfig.PROD_DATABASE_PATH_MACOS;

    let db = new sqlite3.Database(databasePath, (err) => {
        if (err) {
            console.error('Database connection error:', err.message);
        } 
        else {
            console.log('Connected to the SQLite database.');
        }
    });

    ipcMain.handle('execute-query', async (event, query) => {
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                } 
                else {
                    resolve(rows);
                }
            });
        });
    });
}