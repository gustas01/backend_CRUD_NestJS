import * as dotenv from 'dotenv';
import { DataSource } from "typeorm";
import { users1680712218698 } from './migrations/1680712218698-users';

dotenv.config({path: process.env.ENV === 'test' ? '.env.test' : '.env'})

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: [users1680712218698],
})

export default dataSource