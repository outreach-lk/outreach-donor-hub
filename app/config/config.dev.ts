import { AppConfig } from "../types/config";
import { UserRole } from "../types/dtos/user.dtos";
import { HTTPMethod } from "../types/enums/api";

export const devConfig: AppConfig = {
    title: "Outreach Donor Hub",
    laguages: ['en','si','tam'],
    version: "1.0.0b",
    routes: [
        /**
         * Client Side Routes
         */
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
        },
        {
            id: 'cause-view',
            path: '/cause/[id]',
            isEntity: false,
            isProtected: true,
            allowedRoles: [ UserRole.ADMIN, UserRole.MODERATOR ],
        },
        /**
         * API Routes
         */
        {
            id: 'api-cause-fetch-page',
            path: '/api/v1/cause',
            isApi: true,
            isEntity: false,
            isProtected: false,
            apiMethod: HTTPMethod.GET
        },
        {
            id: 'api-cause-create-entity',
            path: '/api/v1/cause',
            isApi: true,
            isEntity: true,
            isProtected: true,
            apiMethod: HTTPMethod.POST,
            allowedRoles: [ UserRole.REGULAR, UserRole.ADMIN, UserRole.MODERATOR ]
        },
        {
            id: 'api-cause-view-entity',
            path: '/api/v1/cause/:id',
            isApi: true,
            isEntity: true,
            isProtected: false,
            apiMethod: HTTPMethod.GET,
            allowedRoles: [ UserRole.REGULAR, UserRole.ADMIN, UserRole.MODERATOR, UserRole.GUEST ]
        },
        {
            id: 'api-cause-update-entity',
            path: '/api/v1/cause/:id',
            isApi: true,
            isEntity: true,
            isProtected: true,
            apiMethod: HTTPMethod.PUT,
            allowedRoles: [ UserRole.REGULAR, UserRole.ADMIN, UserRole.MODERATOR ]
        },
        {
            id: 'api-cause-delete-entity',
            path: '/api/v1/cause/:id',
            isApi: true,
            isEntity: true,
            isProtected: true,
            apiMethod: HTTPMethod.DELETE,
            allowedRoles: [ UserRole.REGULAR, UserRole.ADMIN, UserRole.MODERATOR ]
        },
    ]
}
