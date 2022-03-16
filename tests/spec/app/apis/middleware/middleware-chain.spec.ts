import { IncomingMessage, OutgoingMessage } from "http";
import { Socket } from "net";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { NextRequestMiddlewareChain } from "../../../../../app/api/middleware/middleware-chain"
import { ApiMiddleware, CallNextHandler } from "../../../../../app/types/middleware";
import { MockNextReq } from "./next-req.mock";
import { MockNextRes } from "./next-res.mock";

let chain: NextRequestMiddlewareChain;
let handler: NextApiHandler;
let req: NextApiRequest;
let res: NextApiResponse;
function middleware1(req:NextApiRequest ,res: NextApiResponse,next: CallNextHandler){
    req.body = {middleware: 'middleware1'}
    next();
} 
function middleware2(req:NextApiRequest ,res: NextApiResponse,next: CallNextHandler){
    req.body = {middleware: 'middleware2'};
    next();
};
function middleware3(req:NextApiRequest ,res: NextApiResponse,next: CallNextHandler){
    req.body = {middleware: 'middleware3'};
    next();
};

describe('Middleware Chain', ()=>{
    beforeEach(()=>{
        handler = (req,res)=>{}
        chain = new NextRequestMiddlewareChain( handler );
        jest.spyOn((chain as any).handlers, 'pop');
    });

    it('controller should be set upon consturction',()=>{
        expect( (chain as any).controller ).toEqual( handler );
    });

    it('calling use with first middleware should set next',()=>{
        chain.use( middleware1 );
        expect( (chain as any).next ).toEqual( middleware1 );
    });

    it( 'All expect the first handler must be in the handlers list', () => {
        expect( ((chain as any).handlers as ApiMiddleware[]).length ).toEqual(0);
        chain.use( middleware1 ).use( middleware2).use( middleware3 );
        expect( ((chain as any).handlers as ApiMiddleware[]).pop ).toHaveBeenCalledTimes(1);
        expect( ((chain as any).handlers as ApiMiddleware[]).length ).toEqual(2);
        expect( (chain as any).next ).toEqual( middleware1 );1
    });

});

describe('call',()=>{
    beforeEach(()=>{
        handler = jest.fn((req,res)=>{

        })
        chain = new NextRequestMiddlewareChain( handler );
        req = new MockNextReq();
        res = new MockNextRes();
        jest.spyOn((chain as any).handlers, 'pop');
        jest.spyOn((chain as any).handlers, 'reverse');
        jest.spyOn( chain, 'call');
        
    });
    it('expect the handlers array to be reversed once call is invoked', ()=>{
        chain.call(req, res);
        expect( ((chain as any).handlers as ApiMiddleware[]).reverse).toHaveBeenCalledTimes(1);
    });
    it('should call the handler with the original request when no middleware are used', ()=>{
        chain.call(req,res);
        expect(handler).toHaveBeenCalledWith(req,res)
    })
    it( 'call should be called n times for n middleware', ()=>{
        chain.use( middleware1).use( middleware2 ).use( middleware3 );
        chain.call(req,res);
        expect( chain.call ).toHaveBeenCalledTimes(4); // 3+1
    });
    it('should next to null when all middleware have been called ', () => {
        chain.use( middleware1 );
        expect( (chain as any).next ).toEqual( middleware1 );
        chain.call(req,res);
        expect( (chain as any).next ).toEqual( null );
    })
    it('should call the handler with modified request when a middleware is added', ()=>{
        chain.use( middleware1 );
        chain.call(req,res);
        expect( handler ).toHaveBeenCalledWith({
            ...req,
            body: {middleware: 'middleware1'}
        }, res);
    })
    it('should call the handler with latest modified request when n middleware are added', ()=>{
        chain.use( middleware1 ).use( middleware2 )
        chain.call(req,res);
        expect( handler ).toHaveBeenCalledWith({
            ...req,
            body: {middleware: 'middleware2'}
        }, res);
    })
    it('should break the chain if res send was called',()=>{
        const interruptingMiddleware:ApiMiddleware = (req,res,next)=>{
            res.send('');
            next()
        }
        chain.use( middleware1).use( interruptingMiddleware ).call(req,res);
        expect( handler ).not.toHaveBeenCalled();
    })
})


