schema "main" {
}

table "users" {
    schema = schema.main
    column "id" {
        type = integer
        auto_increment = true
    }
    column "username" {
        null = false
        type = varchar(255)
    }
    column "email" {
        null = false
        type = varchar(319)
    }
    primary_key {
        columns = [
            column.id
        ]
    }
    index "idx_name" {
        columns = [
            column.username
        ]
        unique = true
    }
}

table "pages" {
    schema = schema.main

    column "id" {
        null = false
        type = varchar(50)
    }

    column "author_id" {
        null = false
        type = integer
    }

    column "note" {
        null = true
        type = varchar(255)
    }

    column "created_at" {
        null = false
        type = int
    }

    foreign_key "author_id" {
        columns = [column.author_id]
        ref_columns = [table.users.column.id]
        on_update = NO_ACTION
        on_delete = NO_ACTION
    }

    primary_key {
        columns = [column.id]
    }

}
