import * as SQLite from "expo-sqlite";

import { DATABASE } from "../constants/database";

import { runMigrations } from "./migrations";

let database: SQLite.SQLiteDatabase;

export async function initializeDatabase() {
  database = await SQLite.openDatabaseAsync(
    DATABASE.NAME
  );

  await runMigrations(database);

  return database;
}

export function getDatabase() {
  if (!database) {
    throw new Error(
      "Database has not been initialized."
    );
  }

  return database;
}