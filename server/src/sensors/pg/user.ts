import { CamelizedSchema, UserSchema } from "@server/schemas";
import { sql } from "bun";
import { randomUUID } from "crypto";

class Store {
  async create(props: { email: string; name: string; picture: string | null }) {
    const userId = randomUUID();

    const rows = await sql`
      INSERT INTO "user"
        (user_id,   email,          name,          picture         )
      VALUES
        (${userId}, ${props.email}, ${props.name}, ${props.picture})
      RETURNING *
    `;

    return CamelizedSchema.pipe(UserSchema).parse(rows[0]);
  }

  async getUserById(props: { userId: string }) {
    const rows = await sql`
      SELECT *
      FROM "user"
      WHERE user_id = ${props.userId}
    `;

    return CamelizedSchema.pipe(UserSchema).optional().parse(rows[0]);
  }

  async getUserByEmail(props: { email: string }) {
    const rows = await sql`
      SELECT *
      FROM "user"
      WHERE email = ${props.email}
    `;

    return CamelizedSchema.pipe(UserSchema).optional().parse(rows[0]);
  }

  async getUser(props: { userId: string }) {
    const user = await this.getUserById(props);
    if (!user) throw new Error("user not found");
    return user;
  }
}

export const user = new Store();
