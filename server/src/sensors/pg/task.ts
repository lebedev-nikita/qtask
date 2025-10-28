import { CamelizedSchema } from "@server/schemas";
import { sql } from "bun";
import z from "zod";

class Store {
  async create(props: { queueId: string; title: string }) {
    await sql`
      INSERT INTO task
        (queue_id,          title        )
      VALUES
        (${props.queueId}, ${props.title})
    `;
  }

  async list(props: { queueId: string }) {
    const rows = await sql`
      SELECT *
      FROM task
      WHERE queue_id = ${props.queueId}
    `;

    const schema = CamelizedSchema.pipe(
      z.object({
        taskId: z.string(),
        queueId: z.string(),
        title: z.string(),
        createdAt: z.date(),
      }),
    );

    return z.array(schema).parse(rows);
  }

  async delete(props: { taskId: string; queueId: string }) {
    await sql`
      DELETE FROM task
      WHERE task_id = ${props.taskId}
        AND queue_id = ${props.queueId}
    `;
  }
}

export const task = new Store();
