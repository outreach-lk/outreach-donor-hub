import { AppConfig } from "../types/config";
import { UserRole } from "../types/dtos/user.dtos";
import { HTTPMethod } from "../types/enums/api";

export const stagingConfig: AppConfig = {
    title: "Outreach DonorHub",
    appUrl: 'https://outreach-donor-hub-vercel-deployment-repo.vercel.app',
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
            isEntity: true,
            isProtected: false,
        },
        {
            id: 'cause-create',
            path: '/cause/new',
            isEntity: false,
            isProtected: true,
            allowedRoles: [ UserRole.ADMIN, UserRole.MODERATOR, UserRole.REGULAR ],
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
        {
            id: 'api-cause-events',
            path: '/api/v1/event',
            isApi: true,
            isEntity: true,
            isProtected: false,
            apiMethod: HTTPMethod.GET,
        },
        {
            id: 'api-rpc-unique-donor-ref',
            path: '/api/v1/rpc/donation/ref',
            isApi: true,
            isEntity: false,
            isProtected: true,
            apiMethod: HTTPMethod.POST,
        },
        {
            id: 'api-donation-create-entity',
            path: '/api/v1/donation',
            isApi: true,
            isEntity: true,
            isProtected: true,
            apiMethod: HTTPMethod.POST,
            allowedRoles: [ UserRole.REGULAR, UserRole.ADMIN, UserRole.MODERATOR ]
        },
        {
            id: 'api-donation-fetch-page',
            path: '/api/v1/donation',
            isApi: true,
            isEntity: false,
            isProtected: false,
            apiMethod: HTTPMethod.GET
        },
        {
            id: 'api-donation-update',
            path: '/api/v1/donation/:id',
            isApi: true,
            isEntity: true,
            isProtected: true,
            apiMethod: HTTPMethod.PUT,
            allowedRoles: [ UserRole.REGULAR, UserRole.ADMIN, UserRole.MODERATOR ]

        },
        {
            id: 'api-use-create-entity',
            path: '/api/v1/user',
            isApi: true,
            isEntity: true,
            isProtected: true,
            apiMethod: HTTPMethod.POST,
            allowedRoles: [ UserRole.REGULAR, UserRole.ADMIN, UserRole.MODERATOR ]
        },
        {
            id: 'api-milestone-create-entity',
            path: '/api/v1/milestone',
            isApi: true,
            isEntity: true,
            isProtected: true,
            apiMethod: HTTPMethod.POST,
            allowedRoles: [ UserRole.REGULAR, UserRole.ADMIN, UserRole.MODERATOR ]
        },
        {
            id: 'api-expense-create-entity',
            path: '/api/v1/expense',
            isApi: true,
            isEntity: true,
            isProtected: true,
            apiMethod: HTTPMethod.POST,
            allowedRoles: [ UserRole.REGULAR, UserRole.ADMIN, UserRole.MODERATOR ]
        },
        {
            id: 'api-expense-fetch-page',
            path: '/api/v1/expense',
            isApi: true,
            isEntity: false,
            isProtected: false,
            apiMethod: HTTPMethod.GET
        },
        {
            id: 'api-expense-update',
            path: '/api/v1/expense/:id',
            isApi: true,
            isEntity: true,
            isProtected: true,
            apiMethod: HTTPMethod.PUT,
            allowedRoles: [ UserRole.REGULAR, UserRole.ADMIN, UserRole.MODERATOR ]

        },

    ]
}