import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ApiMiddleware } from "../../types/middleware";

/**
 * A simple object that allows chaining middleware
 * handlers to an ordinary next api request.
 * @kulathilake
 */
export class NextRequestMiddlewareChain {
    private handlers: ApiMiddleware[];
    private controller: NextApiHandler;
    private next: ApiMiddleware | null = null;

    constructor(controller: NextApiHandler){
        this.handlers = [];
        this.controller = controller;
    }

    use(handler: ApiMiddleware): NextRequestMiddlewareChain {
        this.handlers.push(handler);
        if(this.next === null && this.handlers.length === 1) {
            this.next = this.handlers.pop() as ApiMiddleware;
        }
        return this;
    }

    private onError(error:any){

    }

    call(req: NextApiRequest, res: NextApiResponse,error?:any) {
        if(res.headersSent) return;
        this.handlers.reverse();
        return new Promise((resolve,reject)=>{
        if(this.next){
                this.next(req,res,(error?:any)=>{
                    if(this.handlers.length){
                        this.next = this.handlers.pop() as ApiMiddleware;
                    } else {
                        this.next = null;
                    }
                    if(error){
                        resolve( this.call(req,res,error) );
                    }else{
                        resolve(this.call(req,res));
                    }
                })
            } else {
                resolve(this.controller( req, res));
            }
        })
    }
}
