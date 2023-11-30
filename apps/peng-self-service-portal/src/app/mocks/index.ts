import { setupServer } from "msw/node";
import { setupWorker } from "msw/browser";

const allMocks: any = [];

async function initMocks() {
  if (typeof window === "undefined") {
    const server = setupServer(...allMocks);
    server.listen();
  } else {
    const worker = setupWorker(...allMocks);
    worker.start();
  }
}

initMocks();

export {};
