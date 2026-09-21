import { loadEnvConfig } from '@next/env'
 
const projectDir = process.cwd()
loadEnvConfig(projectDir)

export const ENV = {
    BASE_URL_API: process.env.NEXT_PUBLIC_BASE_URL_API || 'http://localhost:9000/api',
}