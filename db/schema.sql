CREATE TABLE queue (
  queue_id    BIGSERIAL PRIMARY KEY,
  name        TEXT        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);


CREATE TYPE task_status AS ENUM ('active', 'finished');

CREATE TABLE task (
  task_id     BIGSERIAL PRIMARY KEY ,
  queue_id    BIGINT            NOT NULL REFERENCES queue (queue_id) ON DELETE CASCADE,
  title       TEXT              NOT NULL,
  created_at  TIMESTAMPTZ       NOT NULL DEFAULT now(),
  priority    DOUBLE PRECISION  NOT NULL,
  status      task_status       NOT NULL DEFAULT 'active',
  UNIQUE (queue_id, priority)
)