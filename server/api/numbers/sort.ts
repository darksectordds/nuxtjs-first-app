import { createRouter, useBase } from "h3";

import sortNumbers from "~/server/events/numbers/sort";

const router = createRouter();

router.post("/sort", sortNumbers)

export default useBase("/api/numbers/", router.handler)