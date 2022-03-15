/**
 * Firebase related helper functions
 */

export function getDocPath( entity: string, identifier: string): string {
    return `${entity}/${identifier}`;
}