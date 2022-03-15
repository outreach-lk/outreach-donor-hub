import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ApiMiddleware } from "../../types/middleware";

/**
 * A simple object that allows chaining middleware
 * handlers to an ordinary next api request.
 */
export class RequestMiddlewareChain {
    private handlers: ApiMiddleware[];
    private controller: NextApiHandler;
    private next: ApiMiddleware | null = null;

    constructor(controller: NextApiHandler){
        this.handlers = [];
        this.controller = controller;
    }

    use(handler: ApiMiddleware): RequestMiddlewareChain {
        this.handlers.push(handler);
        if(this.next === null && this.handlers.length === 1) {
            this.next = this.handlers.pop() as ApiMiddleware;
        }
        return this;
    }

    call(req: NextApiRequest, res: NextApiResponse ) {
        this.handlers.reverse();
        if(this.next){
            this.next(req,res,()=>{
                if(this.handlers.length){
                    this.next = this.handlers.pop() as ApiMiddleware;
                } else {
                    this.next = null;
                }
                this.call(req,res);
            })
        } else {
            return this.controller( req, res);
        }
    }
}
