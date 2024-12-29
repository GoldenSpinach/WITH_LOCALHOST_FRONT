import { setupWorker } from "msw/browser";
import selectorHandler from "./selectorHandler";
export const worker = setupWorker(...selectorHandler);
