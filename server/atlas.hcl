variable "turso_token" {
    type    = string
    default = getenv("TURSO_TOKEN")
}

variable "turso_subdomain" {
  type    = string
  default = getenv("TURSO_SUBDOMAIN")
}

env "turso" {
    url = "libsql+wss://${var.turso_subdomain}.turso.io?authToken=${var.turso_token}"
    exclude = ["_litestream*"]
    dev = "sqlite://dev?mode=memory"
    migration {
        dir = "file://./atlas/migrations"
    }
}
