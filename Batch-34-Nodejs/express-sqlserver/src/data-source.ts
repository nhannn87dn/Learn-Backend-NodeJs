import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

/**
 * Điền các thông số kết nối với SQL Server
 * Account SQL Authenticated
 */
export const AppDataSource = new DataSource({
    type: "mssql",
    host: "NHAN2",
    username: "nhan",
    password: "123456789",
    database: "ExpressSQLServer34",
    synchronize: true, //dong bo
    logging: false, //show log
    entities: [User],
    migrations: [],
    subscribers: [],
    options: {
        encrypt: false,
    },
})
