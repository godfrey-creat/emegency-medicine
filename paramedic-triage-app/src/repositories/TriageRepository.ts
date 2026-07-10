import { getDatabase } from '../database/database';
import { DATABASE } from '../constants/database';
import { TriageRecord } from '../models/TriageRecord';

export default class TriageRepository {
  private table = DATABASE.TABLES.TRIAGE;

  async create(record: TriageRecord): Promise<void> {
    const db = getDatabase();

    await db.runAsync(
      `
      INSERT INTO ${this.table}
      (
        id,
        patient_name,
        condition_description,
        priority,
        status,
        is_synced,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        record.id,
        record.patientName,
        record.conditionDescription,
        record.priority,
        record.status,
        record.isSynced ? 1 : 0,
        record.createdAt,
        record.updatedAt,
      ]
    );
  }

  async findAll(): Promise<TriageRecord[]> {
    const db = getDatabase();

    const rows = await db.getAllAsync<any>(
      `
      SELECT *
      FROM ${this.table}
      ORDER BY created_at DESC
      `
    );

    return rows.map(this.mapRecord);
  }

  async findPending(): Promise<TriageRecord[]> {
    const db = getDatabase();

    const rows = await db.getAllAsync<any>(
      `
      SELECT *
      FROM ${this.table}
      WHERE is_synced = 0
      ORDER BY created_at ASC
      `
    );

    return rows.map(this.mapRecord);
  }

  async findById(id: string): Promise<TriageRecord | null> {
    const db = getDatabase();

    const row = await db.getFirstAsync<any>(
      `
      SELECT *
      FROM ${this.table}
      WHERE id = ?
      `,
      [id]
    );

    if (!row) return null;

    return this.mapRecord(row);
  }

  async markAsSynced(id: string): Promise<void> {
    const db = getDatabase();

    await db.runAsync(
      `
      UPDATE ${this.table}
      SET
        is_synced = 1,
        updated_at = ?
      WHERE id = ?
      `,
      [new Date().toISOString(), id]
    );
  }

  async delete(id: string): Promise<void> {
    const db = getDatabase();

    await db.runAsync(
      `
      DELETE FROM ${this.table}
      WHERE id = ?
      `,
      [id]
    );
  }

  async clear(): Promise<void> {
    const db = getDatabase();

    await db.execAsync(
      `DELETE FROM ${this.table}`
    );
  }

  private mapRecord(row: any): TriageRecord {
    return {
      id: row.id,
      patientName: row.patient_name,
      conditionDescription: row.condition_description,
      priority: row.priority,
      status: row.status,
      isSynced: Boolean(row.is_synced),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}