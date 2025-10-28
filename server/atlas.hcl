env "dev" {
  url = "postgres://postgres:postgres@localhost:5432/qtask?sslmode=disable"
  dev = "docker://postgres/15/dev"
  src = "file://db/schema.sql"
  migration {
    dir = "file://db/migrations"
  }
}
