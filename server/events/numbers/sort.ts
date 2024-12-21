import { constants } from "node:http2";

export default defineEventHandler(async (event) => {
    // Handle request with body
    const body = await readBody(event);
    const numbers = JSON.parse(`[${body}]`)

    // Validation
    if ( !(numbers instanceof Array && numbers.length > 0) ) {
        return {
            status: constants.HTTP_STATUS_BAD_REQUEST,
            message: "Bad Request",
            data: numbers,
            type: typeof numbers
        }
    }

    // Response
    return {
        status: getResponseStatus(event),
        message: "API: sorted numbers",
        data: numbers.sort((a,b) => a - b)
    }
});
