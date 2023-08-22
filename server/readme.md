# trq server

## environment setup

install:
- [deno](https://deno.land/manual@v1.36.2/getting_started/installation)

## development

run server in `--watch` mode
```
deno task dev
```

(these should be done in CI)
format
```
deno task fmt
```

lint
```
deno task lint
```

## database

- [turso](https://docs.turso.tech/reference/turso-cli)
- [atlas](https://atlasgo.io/getting-started/)
- [drizzle-kit](https://docs.turso.tech/reference/turso-cli) global install
  `pnpm add -g drizzle-kit`, might have to install more dependencies globally

add a `.env` file to the in the root dir
```
TURSO_DB_URL=turso_db_url
TURSO_SUBDOMAIN=turso_subdomain
TURSO_TOKEN=turso_db_token //turso db tokens create [dbname]
```

export `.env` variables to the current shell
```
. ./exportenv.sh
```

the source of truth for the db migrations is atlas. the `atlas/schema.hcl` file
defines the structure of the db and atlas will handle the migrations.

sync `../drizzle/schema.ts` with the db
```
deno task drizzle:schema
```

### running schema migrations

make changes to `atlas/schema.hcl`

apply changes to db
```
deno atlas:apply:turso
```
