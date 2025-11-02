import { CamelizedSchema, TaskSchema } from "@server/schemas";
import type { TaskStatus } from "@server/types";
import { sql } from "bun";
import z from "zod";

class Store {
  async create(props: { queueId: string; title: string; priority: number }) {
    await sql`
      INSERT INTO task
        (queue_id,          title,         priority         )
      VALUES
        (${props.queueId}, ${props.title}, ${props.priority})
    `;
  }

  async list(props: { queueId: string }) {
    const rows = await sql`
      SELECT *
      FROM task
      WHERE queue_id = ${props.queueId}
      ORDER BY status = 'active' DESC, priority DESC
    `;

    const schema = CamelizedSchema.pipe(TaskSchema);

    return z.array(schema).parse(rows);
  }

  async delete(props: { taskId: string; queueId: string }) {
    await sql`
      DELETE FROM task
      WHERE task_id = ${props.taskId}
        AND queue_id = ${props.queueId}
    `;
  }

  async setStatus(props: { taskId: string; queueId: string; status: TaskStatus }) {
    await sql`
      UPDATE task 
      SET status = ${props.status}
      WHERE task_id = ${props.taskId}
        AND queue_id = ${props.queueId}
    `;
  }

  async move(props: { taskId: string; fromQueueId: string; toQueueId: string; priority: number }) {
    await sql`
      UPDATE task SET 
        queue_id = ${props.toQueueId},
        priority = ${props.priority}
      WHERE task_id = ${props.taskId}
        AND queue_id = ${props.fromQueueId}
    `;
  }
}

export const task = new Store();
