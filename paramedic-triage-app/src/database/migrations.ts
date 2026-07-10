import { SQLiteDatabase } from "expo-sqlite";
import { DATABASE } from "../constants/database";

export async function runMigrations(
  db: SQLiteDatabase
) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS ${DATABASE.TABLES.TRIAGE} (

      id TEXT PRIMARY KEY NOT NULL,

      patient_name TEXT NOT NULL,

      condition_description TEXT NOT NULL,

      priority INTEGER NOT NULL,

      status TEXT NOT NULL,

      is_synced INTEGER DEFAULT 0,

      created_at TEXT NOT NULL,

      updated_at TEXT NOT NULL

    );
  `);
}