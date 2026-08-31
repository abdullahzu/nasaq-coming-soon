import { EmailMessage } from "cloudflare:email";

import { createWorker } from "./runtime.js";

export default createWorker(EmailMessage);
