env "dev" {
  url = "postgres://postgres:postgres@localhost:5432/qtask?sslmode=disable"
  dev = "postgres://postgres:postgres@localhost:5432/atlas_tmp_db?sslmode=disable"
  src = "file://db/schema.sql"
  migration {
    dir = "file://db/migrations"
  }
}
