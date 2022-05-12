import { OutgoingHttpHeaders, OutgoingHttpHeader, IncomingMessage } from "http";
import { Socket } from "net";
import { NextApiResponse } from "next";
import { Readable } from "stream";

export class MockNextRes implements NextApiResponse{
    unstable_revalidate: (urlPath: string) => Promise<void> = (path:string)=>{return Promise.resolve()};
    statusCode!: number;
    statusMessage!: string;
    assignSocket(socket: Socket): void {
        throw new Error("Method not implemented.");
    }
    detachSocket(socket: Socket): void {
        throw new Error("Method not implemented.");
    }
    writeContinue(callback?: () => void): void {
        throw new Error("Method not implemented.");
    }
    writeHead(statusCode: number, statusMessage?: string, headers?: OutgoingHttpHeaders | OutgoingHttpHeader[]): this;
    writeHead(statusCode: number, headers?: OutgoingHttpHeaders | OutgoingHttpHeader[]): this;
    writeHead(statusCode: any, statusMessage?: any, headers?: any): this {
        throw new Error("Method not implemented.");
    }
    writeProcessing(): void {
        throw new Error("Method not implemented.");
    }
    req!: IncomingMessage;
    chunkedEncoding!: boolean;
    shouldKeepAlive!: boolean;
    useChunkedEncodingByDefault!: boolean;
    sendDate!: boolean;
    finished!: boolean;
    headersSent!: boolean;
    connection!: Socket | null;
    socket!: Socket | null;
    setTimeout(msecs: number, callback?: () => void): this {
        throw new Error("Method not implemented.");
    }
    setHeader(name: string, value: string | number | readonly string[]): this {
        throw new Error("Method not implemented.");
    }
    getHeader(name: string): string | number | string[] | undefined {
        throw new Error("Method not implemented.");
    }
    getHeaders(): OutgoingHttpHeaders {
        throw new Error("Method not implemented.");
    }
    getHeaderNames(): string[] {
        throw new Error("Method not implemented.");
    }
    hasHeader(name: string): boolean {
        throw new Error("Method not implemented.");
    }
    removeHeader(name: string): void {
        throw new Error("Method not implemented.");
    }
    addTrailers(headers: OutgoingHttpHeaders | readonly [string, string][]): void {
        throw new Error("Method not implemented.");
    }
    flushHeaders(): void {
        throw new Error("Method not implemented.");
    }
    writable!: boolean;
    writableEnded!: boolean;
    writableFinished!: boolean;
    writableHighWaterMark!: number;
    writableLength!: number;
    writableObjectMode!: boolean;
    writableCorked!: number;
    destroyed!: boolean;
    _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void): void {
        throw new Error("Method not implemented.");
    }
    _destroy(error: Error | null, callback: (error?: Error | null) => void): void {
        throw new Error("Method not implemented.");
    }
    _final(callback: (error?: Error | null) => void): void {
        throw new Error("Method not implemented.");
    }
    write(chunk: any, callback?: (error: Error | null | undefined) => void): boolean;
    write(chunk: any, encoding: BufferEncoding, callback?: (error: Error | null | undefined) => void): boolean;
    write(chunk: any, encoding?: any, callback?: any): boolean {
        throw new Error("Method not implemented.");
    }
    setDefaultEncoding(encoding: BufferEncoding): this {
        throw new Error("Method not implemented.");
    }
    end(cb?: () => void): this;
    end(chunk: any, cb?: () => void): this;
    end(chunk: any, encoding: BufferEncoding, cb?: () => void): this;
    end(chunk?: any, encoding?: any, cb?: any): this {
        throw new Error("Method not implemented.");
    }
    cork(): void {
        throw new Error("Method not implemented.");
    }
    uncork(): void {
        throw new Error("Method not implemented.");
    }
    destroy(error?: Error): this {
        throw new Error("Method not implemented.");
    }
    addListener(event: "close", listener: () => void): this;
    addListener(event: "drain", listener: () => void): this;
    addListener(event: "error", listener: (err: Error) => void): this;
    addListener(event: "finish", listener: () => void): this;
    addListener(event: "pipe", listener: (src: Readable) => void): this;
    addListener(event: "unpipe", listener: (src: Readable) => void): this;
    addListener(event: string | symbol, listener: (...args: any[]) => void): this;
    addListener(event: any, listener: any): this {
        throw new Error("Method not implemented.");
    }
    emit(event: "close"): boolean;
    emit(event: "drain"): boolean;
    emit(event: "error", err: Error): boolean;
    emit(event: "finish"): boolean;
    emit(event: "pipe", src: Readable): boolean;
    emit(event: "unpipe", src: Readable): boolean;
    emit(event: string | symbol, ...args: any[]): boolean;
    emit(event: any, src?: any, ...rest: any[]): boolean {
        throw new Error("Method not implemented.");
    }
    on(event: "close", listener: () => void): this;
    on(event: "drain", listener: () => void): this;
    on(event: "error", listener: (err: Error) => void): this;
    on(event: "finish", listener: () => void): this;
    on(event: "pipe", listener: (src: Readable) => void): this;
    on(event: "unpipe", listener: (src: Readable) => void): this;
    on(event: string | symbol, listener: (...args: any[]) => void): this;
    on(event: any, listener: any): this {
        throw new Error("Method not implemented.");
    }
    once(event: "close", listener: () => void): this;
    once(event: "drain", listener: () => void): this;
    once(event: "error", listener: (err: Error) => void): this;
    once(event: "finish", listener: () => void): this;
    once(event: "pipe", listener: (src: Readable) => void): this;
    once(event: "unpipe", listener: (src: Readable) => void): this;
    once(event: string | symbol, listener: (...args: any[]) => void): this;
    once(event: any, listener: any): this {
        throw new Error("Method not implemented.");
    }
    prependListener(event: "close", listener: () => void): this;
    prependListener(event: "drain", listener: () => void): this;
    prependListener(event: "error", listener: (err: Error) => void): this;
    prependListener(event: "finish", listener: () => void): this;
    prependListener(event: "pipe", listener: (src: Readable) => void): this;
    prependListener(event: "unpipe", listener: (src: Readable) => void): this;
    prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
    prependListener(event: any, listener: any): this {
        throw new Error("Method not implemented.");
    }
    prependOnceListener(event: "close", listener: () => void): this;
    prependOnceListener(event: "drain", listener: () => void): this;
    prependOnceListener(event: "error", listener: (err: Error) => void): this;
    prependOnceListener(event: "finish", listener: () => void): this;
    prependOnceListener(event: "pipe", listener: (src: Readable) => void): this;
    prependOnceListener(event: "unpipe", listener: (src: Readable) => void): this;
    prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
    prependOnceListener(event: any, listener: any): this {
        throw new Error("Method not implemented.");
    }
    removeListener(event: "close", listener: () => void): this;
    removeListener(event: "drain", listener: () => void): this;
    removeListener(event: "error", listener: (err: Error) => void): this;
    removeListener(event: "finish", listener: () => void): this;
    removeListener(event: "pipe", listener: (src: Readable) => void): this;
    removeListener(event: "unpipe", listener: (src: Readable) => void): this;
    removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
    removeListener(event: any, listener: any): this {
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
    send(body: any): NextApiResponse<any>{
        this.headersSent = true;
        return this;
    }
    json!: (body: any) => void;
    status!: (statusCode: number) => NextApiResponse<any>;
    redirect(url: string): NextApiResponse<any>;
    redirect(status: number, url: string): NextApiResponse<any>;
    redirect(status: any, url?: any): NextApiResponse<any> {
        throw new Error("Method not implemented.");
    }
    setPreviewData!: (data: string | object, options?: { maxAge?: number | undefined; } | undefined) => NextApiResponse<any>;
    clearPreviewData!: () => NextApiResponse<any>;
    
}