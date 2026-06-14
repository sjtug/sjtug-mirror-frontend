/**
 * Docker entrypoint for the Astro.js frontend server.
 *
 * Astro's standalone server does not handle SIGTERM — it keeps running
 * indefinitely, forcing Docker to SIGKILL the container after the grace
 * period. This wrapper captures the HTTP server instance created by Astro
 * and performs a graceful shutdown on SIGTERM/SIGINT.
 */
import http from "node:http";
import https from "node:https";

// --- Monkey-patch http/https.createServer to capture the server instance ---
let server = null;

const origHttpCreate = http.createServer.bind(http);
const origHttpsCreate = https.createServer.bind(https);

http.createServer = (...args) => {
  server = origHttpCreate(...args);
  http.createServer = origHttpCreate; // restore after first call
  return server;
};

https.createServer = (...args) => {
  server = origHttpsCreate(...args);
  https.createServer = origHttpsCreate;
  return server;
};

// --- Graceful shutdown ---
const SHUTDOWN_TIMEOUT_MS = 10_000;
let shuttingDown = false;

function gracefulShutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;

  console.log(`Received ${signal}, shutting down gracefully...`);

  if (server) {
    // server-destroy (used by @astrojs/node) patches .destroy() onto the
    // server; fall back to .close() if it is absent.
    const close = server.destroy?.bind(server) ?? server.close.bind(server);

    const forceExit = setTimeout(() => {
      console.log("Graceful shutdown timed out, forcing exit");
      process.exit(1);
    }, SHUTDOWN_TIMEOUT_MS);

    close((err) => {
      if (err) console.error("Error closing server:", err);
      clearTimeout(forceExit);
      process.exit(err ? 1 : 0);
    });
  } else {
    process.exit(0);
  }
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// --- Start the Astro standalone server ---
await import("./dist/server/entry.mjs");