/**
 * Enum for Auth Providers.
 */
 export enum AuthProvider{
    FIREBASE = "FIREBASE",
    AWSCOGNITO = "AWSCOGNITO",
    NEXTAUTH = "NEXTAUTH",
    MOCK = "MOCK"
}

/** 
 * OAuth Federation Providers
 */
export enum OAuthProviders{
    GOOGLE = "GOOGLE",
    FACEBOOK = "FACEBOOK",
    GITHUB = "GITHUB"
}
/**
 * Enum for File Storage Providers.
 */
 export enum FileStorageProvider{
    FIRESTORAGE = "FIRESTORAGE",
    AWSS3 = "AWSS3",
    LOCALFILESYSTEM = "LOCALFILESYSTEM",
    OTHERHTTP = "OTHERHTTP",
}

/**
 * Enum for Databse Providers.
 */
export enum DatabaseProvider{
    FIREBASE = 'FIREBASE',
    DYNAMODB = 'DYNAMODB',
    
}