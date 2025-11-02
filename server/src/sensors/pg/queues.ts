import { sql } from "bun";
import z from "zod";
import { CamelizedSchema, QueueSchema } from "../../schemas";

class Store {
  async list() {
    const rows = await sql`
      SELECT *
      FROM queue
      ORDER BY created_at ASC
    `;

    const schema = CamelizedSchema.pipe(QueueSchema);

    return z.array(schema).parse(rows);
  }

  async create(props: { name: string }) {
    await sql`
      INSERT INTO queue
        (name)
      VALUES
        (${props.name})    
    `;
  }

  async delete(props: { queueId: string }) {
    await sql`
      DELETE FROM queue
      WHERE queue_id = ${props.queueId}
    `;
  }

  async setName(props: { queueId: string; name: string }) {
    await sql`
      UPDATE queue
      SET name = ${props.name}
      WHERE queue_id = ${props.queueId}
    `;
  }
}

export const queue = new Store();
