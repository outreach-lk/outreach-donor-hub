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
 * Enum for File Storage Providers.
 */
 export enum FileStorageProvider{
    FIRESTORAGE = "FIRESTORAGE",
    AWSS3 = "AWSS3",
    LOCALFILESYSTEM = "LOCALFILESYSTEM",
    OTHERHTTP = "OTHERHTTP",
}