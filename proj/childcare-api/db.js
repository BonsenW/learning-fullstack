import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, 'db.json');

export default {
    loadDB: async () => {
        const data = await fs.readFile(DB_PATH, 'utf8');
        return JSON.parse(data);
    },

    saveDB: async (db) => {
        await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
    }
};
