
import { NextApiRequest } from "next";
import User from "../data/entities/user.entity";
import { AuthProvider } from "../types/enums/providers";
import { authServiceFactory } from "../api/services";
import { UserRole } from "../types/dtos/user.dtos";

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
            if(process.env.NEXT_PUBLIC_STAGE === 'dev'){
                switch(token){
                    default:
                    case 'Bearer admin':
                        return {uid:'demo_admin',role: UserRole.ADMIN} as User;
                    case 'Bearer regular':
                        return {uid: 'demo_regular', role: UserRole.REGULAR} as User;
                    case 'Bearer regular_owner':
                        return {uid: 'demo_owner',role: UserRole.REGULAR} as User;
                    case 'Bearer mod':
                        return {uid: 'demo_mod',role: UserRole.MODERATOR} as User
                }
            } else {
                throw new Error('token_interception_error');
            }
        }
    }else {
        return null;
    }
}