import { sql } from "bun";
import z from "zod";
import { CamelizedSchema } from "../../schemas";

class Store {
  async list() {
    const rows = await sql`
      SELECT *
      FROM queue
    `;

    const schema = CamelizedSchema.pipe(
      z.object({
        queueId: z.string(),
        name: z.string(),
        createdAt: z.date(),
      }),
    );

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
}

export const queue = new Store();
