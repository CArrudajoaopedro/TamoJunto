export interface AppConfig
{
    port: number;
    databaseUrl: string;
    jwtSecret: string;
}
export function loadConfig(): AppConfig
{
    const databaseUrl = process.env.DATABASE_URL;
    const jwtSecret = process.env.JWT_SECRET;
    if (!databaseUrl)
    {
        console.error("Erro: DATABASE_URL não está definida.");
        process.exit(1);
    }
    if (!jwtSecret)
    {
        console.error("Erro: JWT_SECRET não definido.");
        process.exit(1);
    }
    return {
        port: parseInt(process.env.PORT ?? "3000", 10),
        databaseUrl,
        jwtSecret,
    };
}