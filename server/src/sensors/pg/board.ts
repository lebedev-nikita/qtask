import { BoardSchema, CamelizedSchema, QtaskSchema } from "@server/schemas";
import { sql } from "bun";
import z from "zod";

class BoardStore {
  async create(props: { title: string; createdBy: string }) {
    await sql`
      INSERT INTO board
        (title,           created_by       )
      VALUES
        (${props.title}, ${props.createdBy})
    `;
  }

  async list() {
    const rows = await sql`
      SELECT *
      FROM board
      ORDER BY created_at DESC
    `;

    return z.array(CamelizedSchema.pipe(BoardSchema)).parse(rows);
  }

  async delete(props: { boardId: string }) {
    await sql`
      DELETE FROM board
      WHERE board_id = ${props.boardId}
    `;
  }

  async addQtask(props: { boardId: string; qtaskId: string; createdBy: string }) {
    await sql`
      INSERT INTO board_x_qtask
        (board_id,          qtask_id,         created_by       )
      VALUES
        (${props.boardId}, ${props.qtaskId}, ${props.createdBy})
      ON CONFLICT (board_id, qtask_id) DO NOTHING
    `;
  }

  async listQtasks(props: { boardId: string | null }) {
    const filters = {
      boardId: props.boardId ? sql`board_id = ${props.boardId}` : true,
    };

    const rows = await sql`
      SELECT qtask.*
      FROM qtask 
      LEFT JOIN board_x_qtask USING (qtask_id)
      WHERE ${filters.boardId}
      ORDER BY qtask_id
    `;

    return z.array(CamelizedSchema.pipe(QtaskSchema)).parse(rows);
  }

  async remoteQtask(props: { boardId: string; qtaskId: string }) {
    await sql`
      DELETE FROM board_x_qtask
      WHERE board_id = ${props.boardId}
        AND qtask_id = ${props.qtaskId}
    `;
  }
}

export const boradStore = new BoardStore();
