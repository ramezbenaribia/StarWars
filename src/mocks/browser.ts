import { setupWorker, rest, SetupWorkerApi } from 'msw'
import { handlers } from './handlers'

// Configure the Service Worker for in-browser request interception
export const worker = setupWorker(...handlers)

// worker.start()
declare global {
    interface Window {
        msw: {
            worker: SetupWorkerApi;
            rest: typeof rest;
        };
    }
}

// Make the `worker` and `rest` references available globally,
// so they can be accessed in both runtime and test suites.
window.msw = {
    worker,
    rest,
};