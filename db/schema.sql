CREATE TYPE qtask_status AS ENUM ('active', 'finished');

CREATE TABLE "user" (
  user_id     UUID        PRIMARY KEY,
  email       TEXT        NOT NULL UNIQUE,
  name        TEXT        NOT NULL,
  picture     TEXT            NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE qtask (
  qtask_id      UUID              NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title         TEXT              NOT NULL,
  description   TEXT                  NULL,
  created_at    TIMESTAMPTZ       NOT NULL DEFAULT now(),
  status        qtask_status      NOT NULL DEFAULT 'active',
  priority      DOUBLE PRECISION  NOT NULL,
  parent_id     UUID                  NULL REFERENCES qtask (qtask_id),
  created_by    UUID              NOT NULL REFERENCES "user" (user_id),
  UNIQUE NULLS DISTINCT (parent_id, priority)
);

CREATE TABLE board (
  board_id    UUID        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by  UUID        NOT NULL REFERENCES "user" (user_id)
);

CREATE TABLE board_x_qtask (
  board_id    UUID        NOT NULL REFERENCES board (board_id),
  qtask_id    UUID        NOT NULL REFERENCES qtask (qtask_id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by  UUID        NOT NULL REFERENCES "user" (user_id),

  PRIMARY KEY (board_id, qtask_id)
);