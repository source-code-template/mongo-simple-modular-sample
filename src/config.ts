export const config = {
  port: 8080,
  allow: {
    origin: "*",
    credentials: "true",
    methods: "GET,PUT,POST,DELETE,OPTIONS,PATCH",
    headers: "*",
  },
  log: {
    level: "info",
    map: {
      time: "time",
      msg: "msg",
    },
  },
  middleware: {
    log: true,
    skips: "health,log,middleware",
    request: "request",
    response: "response",
    status: "status",
    size: "size",
  },
  mongo: {
    uri: "",
    db: "",
  },
}

export const env = {
  sit: {
    mongo: {
      db: "masterdata_sit",
    },
  },
  prd: {
    log: {
      level: "error",
    },
    middleware: {
      log: false,
    },
  },
}
