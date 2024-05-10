import { pool } from "../database/connection.js";

//consultar todos los estudiantes.

const findAll = async () => {
  const { rows } = await pool.query("SELECT * FROM ESTUDIANTES");
  return rows;
};

//consultar estudiante por rut

const findOneByRut = async (rut) => {
  const query = {
    text: `SELECT * FROM ESTUDIANTES WHERE RUT = $1`,
    values: [rut],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};
//crear estudiantes

const create = async ({ name, rut, curso, nivel, edad }) => {
  const query = {
    text: `
        INSERT INTO ESTUDIANTES (NAME,RUT, CURSO,NIVEL, EDAD) 
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
    values: [name, rut, curso, nivel, edad],
  };

  const { rows } = await pool.query(query);
  console.log(rows[0]);
};

//Eliminar Estudiante by RUT
const remove = async (rut) => {
  const query = {
    text: `
          DELETE FROM ESTUDIANTES WHERE RUT = $1
          RETURNING *
      `,
    values: [rut],
  };

  const { rows } = await pool.query(query);
  return rows[0];
};

//Actualizar estudiante por rut
const update = async (estudiante) => {
  const query = {
    text: `
    UPDATE ESTUDIANTES
    SET CURSO = $2,
    NIVEL =  $3,
    EDAD = $4
    WHERE RUT = $1
    RETURNING *
    `,
    values: [
      estudiante.rut,
      estudiante.curso,
      estudiante.nivel,
      estudiante.edad,
    ],
  };
  const { rows } = await pool.query(query);
  return rows[0];
};

//findAll();
export const Estudiante = { findAll, findOneByRut, create, remove, update };
