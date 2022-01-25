import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn: "https://cd5e7a728dec47afb98a3b369f0a65c1@o1113861.ingest.sentry.io/6149285",
    integrations: [new Integrations.BrowserTracing()],
    release: "1.0.0",
    environment: "development",
    tracesSampleRate: 1.0,
  });
}

function log(error) {
  Sentry.captureException(error);
}

const exportedObj = {
  init,
  log,
};

export default exportedObj;
