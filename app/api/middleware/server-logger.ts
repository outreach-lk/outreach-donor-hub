/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { NextApiRequest, NextApiResponse } from "next";
import { CallNextHandler } from "../../types/middleware";

export function requestLogger(req: NextApiRequest, res: NextApiResponse, next: CallNextHandler) {
    const current_datetime = new Date();
    const formatted_date =
        current_datetime.getFullYear() +
        "-" +
        (current_datetime.getMonth() + 1) +
        "-" +
        current_datetime.getDate() +
        " " +
        current_datetime.getHours() +
        ":" +
        current_datetime.getMinutes() +
        ":" +
        current_datetime.getSeconds();
    const log = `[${formatted_date}] ${req.method as string}:${req.url as string}`
    console.log(log)
    next();
}