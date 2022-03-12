import { AppConfig } from "../types/config";
import { UserRole } from "../types/dtos/user.dtos";

export const devConfig: AppConfig = {
    title: "Outreach Donor Hub",
    laguages: ['en','si','tam'],
    version: "1.0.0b",
    routes: [
        {
            id: 'test',
            path: '/test',
            isEntity: false,
            isProtected: true,
        },
        {
            id: 'home',
            path: '/',
            isEntity: false,
            isProtected: false,
        },
        {
            id: 'sign-in',
            path: '/auth/sign-in',
            isEntity: false,
            isProtected: false
        },
        {
            id: 'sign-up',
            path: '/auth/sign-up',
            isEntity: false,
            isProtected: false
        },
        {
            id: 'mod-dashboard',
            path: '/mod',
            isEntity: false,
            isProtected: true,
            allowedRoles: [ UserRole.ADMIN, UserRole.MODERATOR ],
        }
    ]
}
