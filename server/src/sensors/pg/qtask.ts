import { CamelizedSchema, QtaskSchema } from "@server/schemas";
import type { QtaskStatus } from "@server/types";
import { sql } from "bun";
import z from "zod";

class Store {
  async list(props: { parentId: string | null }) {
    const filters = {
      parentId:
        props.parentId === null ? sql`parent_id IS NULL` : sql`parent_id = ${props.parentId}`,
    };

    const rows = await sql`
      SELECT * 
      FROM qtask
      WHERE ${filters.parentId}
      ORDER BY priority DESC
    `;

    return z.array(CamelizedSchema.pipe(QtaskSchema)).parse(rows);
  }

  async create(props: {
    title: string;
    description: string | null;
    parentId: string | null;
    priority: number;
    createdBy: string;
  }) {
    const rows = await sql`
      INSERT INTO qtask
        (title,           description,          parent_id,         priority,         created_by        )
      VALUES
        (${props.title}, ${props.description}, ${props.parentId}, ${props.priority}, ${props.createdBy})
      RETURNING *
    `;

    return CamelizedSchema.pipe(QtaskSchema).parse(rows[0]);
  }

  async delete(props: { qtaskId: string }) {
    await sql`
      DELETE FROM qtask
      WHERE qtask_id = ${props.qtaskId}
    `;
  }

  async setStatus(props: { qtaskId: string; status: QtaskStatus }) {
    await sql`
      UPDATE qtask
      SET status = ${props.status}
      WHERE qtask_id = ${props.qtaskId}
    `;
  }

  async setParent(props: { qtaskId: string; parentId: string | null; priority: number }) {
    await sql`
      UPDATE qtask SET 
        parent_id = ${props.parentId},
        priority = ${props.priority}
      WHERE qtask_id = ${props.qtaskId}
    `;
  }

  async setTitle(props: { qtaskId: string; title: string }) {
    await sql`
      UPDATE qtask
      SET title = ${props.title}
      WHERE qtask_id = ${props.qtaskId}
    `;
  }
}

export const qtaskStore = new Store();
