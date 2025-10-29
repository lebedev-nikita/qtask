CREATE TABLE queue (
  queue_id    BIGSERIAL PRIMARY KEY,
  name        TEXT        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE task (
  task_id     BIGSERIAL PRIMARY KEY ,
  queue_id    BIGINT            NOT NULL REFERENCES queue (queue_id),
  title       TEXT              NOT NULL,
  created_at  TIMESTAMPTZ       NOT NULL DEFAULT now(),
  priority    DOUBLE PRECISION  NOT NULL,
  UNIQUE (queue_id, priority)
)