import { ipcMain } from 'electron';
import sqlite3 from 'sqlite3';
import databaseConfig from './database.config.js';

export const setupDatabase = () => {
    let databasePath = '';

    if(process.env.NODE_ENV === 'development') {
        databasePath = databaseConfig.DEV_RELATVE_DATABASE_PATH;
    }
    else {
        //if(process.env.OS_ENV === 'mac') {
            databasePath = databaseConfig.PROD_DATABASE_PATH_MACOS;
        //}
        //else if(process.env.OS_ENV === 'win') {
        //    databasePath = databaseConfig.PROD_DATABASE_PATH_WIN;
        //}
    }

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