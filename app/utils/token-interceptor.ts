
import { NextApiRequest, NextApiResponse } from "next";
import User from "../data/entities/user.entity";
import { AuthProvider } from "../types/enums/providers";
import { authServiceFactory } from "../api/services";

/**
 * Intercepts request authorization token and returns user & permissions 
 * @param req 
 * @param res 
 * @version 1.0.0b uses Firebase as the Provider
 */
export async function tokenInterceptor(req:NextApiRequest): Promise<User | null> {
    const auth = authServiceFactory.getService( 
        process.env.SERVER_PRIVATE_KEY as string,
        AuthProvider.FIREBASE
    );
    if( req.headers.authorization ){
        const token = req.headers.authorization;
        try {
            return await auth.findUserByToken( token )
        } catch (error) {
            throw new Error('token_interception_error');
        }
    }else {
        return null;
    }
}