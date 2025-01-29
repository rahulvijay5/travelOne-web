declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_BACKEND_URL: string;
        BackendURL: string;
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
        CLERK_SECRET_KEY: string;
        SuperAdminEmail: string;
    }
} 