import "dotenv/config";
import pg from "pg";

//destructuring
const { Pool } = pg;

const connectionString = process.env.POSTGRES_URL;

//el pool es para hacer las consultas agrupadas
export const pool = new Pool({
  connectionString,
  allowExitOnIdle: true,
});

try {
  const { rows } = await pool.query("select now()");
  console.log("db conectada exitosamente");
} catch (error) {
  console.log(error);
}
