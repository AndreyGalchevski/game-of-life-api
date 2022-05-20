import http from "http";

import app from "./app";

const normalizePort = (val: string): string | number | false => {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

const server = http.createServer(app);

const onError = (error: NodeJS.ErrnoException): never => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  if (error.code === "EACCES") {
    console.error(`${bind} requires elevated privileges`); // eslint-disable-line no-console
    process.exit(1);
  } else if (error.code === "EADDRINUSE") {
    console.error(`${bind} is already in use`); // eslint-disable-line no-console
    process.exit(1);
  } else {
    throw error;
  }
};

const onListening = (): void => {
  const addr = server.address();
  const bind =
    typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port || 8080}`;
  console.log(`Server live on ${bind}`); // eslint-disable-line no-console
};

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
