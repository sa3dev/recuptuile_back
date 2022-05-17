export function isProduction(env: string): boolean {
    return typeof env === 'string' && env === 'production';
}