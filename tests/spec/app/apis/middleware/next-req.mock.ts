import { Env } from "@next/env";
import { IncomingHttpHeaders } from "http";
import { Socket } from "net";
import { NextApiRequest, PreviewData } from "next/types";

export class MockNextReq implements NextApiRequest{
    query!: { [key: string]: string | string[]; };
    cookies!: { [key: string]: string; };
    body: any;
    env!: Env;
    preview?: boolean | undefined;
    previewData?: PreviewData;
    aborted!: boolean;
    httpVersion!: string;
    httpVersionMajor!: number;
    httpVersionMinor!: number;
    complete!: boolean;
    connection!: Socket;
    socket!: Socket;
    headers!: IncomingHttpHeaders;
    rawHeaders!: string[];
    trailers!: NodeJS.Dict<string>;
    rawTrailers!: string[];
    setTimeout(msecs: number, callback?: () => void): this {
        throw new Error("Method not implemented.");
    }
    method?: string | undefined;
    url?: string | undefined;
    statusCode?: number | undefined;
    statusMessage?: string | undefined;
    destroy(error?: Error): this {
        throw new Error("Method not implemented.");
    }
    readableAborted!: boolean;
    readable!: boolean;
    readableDidRead!: boolean;
    readableEncoding!: BufferEncoding | null;
    readableEnded!: boolean;
    readableFlowing!: boolean | null;
    readableHighWaterMark!: number;
    readableLength!: number;
    readableObjectMode!: boolean;
    destroyed!: boolean;
    _read(size: number): void {
        throw new Error("Method not implemented.");
    }
    read(size?: number) {
        throw new Error("Method not implemented.");
    }
    setEncoding(encoding: BufferEncoding): this {
        throw new Error("Method not implemented.");
    }
    pause(): this {
        throw new Error("Method not implemented.");
    }
    resume(): this {
        throw new Error("Method not implemented.");
    }
    isPaused(): boolean {
        throw new Error("Method not implemented.");
    }
    unpipe(destination?: NodeJS.WritableStream): this {
        throw new Error("Method not implemented.");
    }
    unshift(chunk: any, encoding?: BufferEncoding): void {
        throw new Error("Method not implemented.");
    }
    wrap(stream: NodeJS.ReadableStream): this {
        throw new Error("Method not implemented.");
    }
    push(chunk: any, encoding?: BufferEncoding): boolean {
        throw new Error("Method not implemented.");
    }
    _destroy(error: Error | null, callback: (error?: Error | null) => void): void {
        throw new Error("Method not implemented.");
    }
    addListener(event: "close", listener: () => void): this;
    addListener(event: "data", listener: (chunk: any) => void): this;
    addListener(event: "end", listener: () => void): this;
    addListener(event: "error", listener: (err: Error) => void): this;
    addListener(event: "pause", listener: () => void): this;
    addListener(event: "readable", listener: () => void): this;
    addListener(event: "resume", listener: () => void): this;
    addListener(event: string | symbol, listener: (...args: any[]) => void): this;
    addListener(event: any, listener: any): this {
        throw new Error("Method not implemented.");
    }
    emit(event: "close"): boolean;
    emit(event: "data", chunk: any): boolean;
    emit(event: "end"): boolean;
    emit(event: "error", err: Error): boolean;
    emit(event: "pause"): boolean;
    emit(event: "readable"): boolean;
    emit(event: "resume"): boolean;
    emit(event: string | symbol, ...args: any[]): boolean;
    emit(event: any, err?: any, ...rest: any[]): boolean {
        throw new Error("Method not implemented.");
    }
    on(event: "close", listener: () => void): this;
    on(event: "data", listener: (chunk: any) => void): this;
    on(event: "end", listener: () => void): this;
    on(event: "error", listener: (err: Error) => void): this;
    on(event: "pause", listener: () => void): this;
    on(event: "readable", listener: () => void): this;
    on(event: "resume", listener: () => void): this;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
    on(event: any, listener: any): this {
        throw new Error("Method not implemented.");
    }
    once(event: "close", listener: () => void): this;
    once(event: "data", listener: (chunk: any) => void): this;
    once(event: "end", listener: () => void): this;
    once(event: "error", listener: (err: Error) => void): this;
    once(event: "pause", listener: () => void): this;
    once(event: "readable", listener: () => void): this;
    once(event: "resume", listener: () => void): this;
    once(event: string | symbol, listener: (...args: any[]) => void): this;
    once(event: any, listener: any): this {
        throw new Error("Method not implemented.");
    }
    prependListener(event: "close", listener: () => void): this;
    prependListener(event: "data", listener: (chunk: any) => void): this;
    prependListener(event: "end", listener: () => void): this;
    prependListener(event: "error", listener: (err: Error) => void): this;
    prependListener(event: "pause", listener: () => void): this;
    prependListener(event: "readable", listener: () => void): this;
    prependListener(event: "resume", listener: () => void): this;
    prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
    prependListener(event: any, listener: any): this {
        throw new Error("Method not implemented.");
    }
    prependOnceListener(event: "close", listener: () => void): this;
    prependOnceListener(event: "data", listener: (chunk: any) => void): this;
    prependOnceListener(event: "end", listener: () => void): this;
    prependOnceListener(event: "error", listener: (err: Error) => void): this;
    prependOnceListener(event: "pause", listener: () => void): this;
    prependOnceListener(event: "readable", listener: () => void): this;
    prependOnceListener(event: "resume", listener: () => void): this;
    prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
    prependOnceListener(event: any, listener: any): this {
        throw new Error("Method not implemented.");
    }
    removeListener(event: "close", listener: () => void): this;
    removeListener(event: "data", listener: (chunk: any) => void): this;
    removeListener(event: "end", listener: () => void): this;
    removeListener(event: "error", listener: (err: Error) => void): this;
    removeListener(event: "pause", listener: () => void): this;
    removeListener(event: "readable", listener: () => void): this;
    removeListener(event: "resume", listener: () => void): this;
    removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
    removeListener(event: any, listener: any): this {
        throw new Error("Method not implemented.");
    }
    [Symbol.asyncIterator](): AsyncIterableIterator<any> {
        throw new Error("Method not implemented.");
    }
    pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean | undefined; }): T {
        throw new Error("Method not implemented.");
    }
    off(eventName: string | symbol, listener: (...args: any[]) => void): this {
        throw new Error("Method not implemented.");
    }
    removeAllListeners(event?: string | symbol): this {
        throw new Error("Method not implemented.");
    }
    setMaxListeners(n: number): this {
        throw new Error("Method not implemented.");
    }
    getMaxListeners(): number {
        throw new Error("Method not implemented.");
    }
    listeners(eventName: string | symbol): Function[] {
        throw new Error("Method not implemented.");
    }
    rawListeners(eventName: string | symbol): Function[] {
        throw new Error("Method not implemented.");
    }
    listenerCount(eventName: string | symbol): number {
        throw new Error("Method not implemented.");
    }
    eventNames(): (string | symbol)[] {
        throw new Error("Method not implemented.");
    }
    
}