//export all environment variables from .env file

export const ENV = {
    API_URL: import.meta.env.VITE_API_URL,
    APP_NAME: import.meta.env.VITE_APP_NAME,
}