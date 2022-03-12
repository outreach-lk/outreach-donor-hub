import { AppConfig } from "../types/config";

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
        }
    ]
}
