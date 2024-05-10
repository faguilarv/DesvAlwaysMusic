import "dotenv/config";
import express from "express";
import { Estudiante } from "./models/estudiante.model.js";

const app = express();
//para habilitar req.body crear este middleware
app.use(express.json());
//si mandan formularios nativos de html usar urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/estudiante", async (req, res) => {
  try {
    const estudiantes = await Estudiante.findAll();
    return res.json(estudiantes);
  } catch (error) {
    return res.status(500).json({ ok: false });
  }

  // res.send("Hello World!");
});
//CONSULTANDO POR RUT
app.get("/estudiante/:rut", async (req, res) => {
  try {
    const { rut } = req.params;
    const estudiante = await Estudiante.findOneByRut(rut);
    return res.json(estudiante);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false });
  }
});
//CREANDO ESTUDIANTE
app.post("/estudiante", async (req, res) => {
  try {
    const { name, rut, curso, nivel, edad } = req.body;
    const newEstudiante = await Estudiante.create({
      name,
      rut,
      curso,
      nivel,
      edad,
    });
    return res.json(newEstudiante); //el newEstudiante se devuelve a la vista
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false });
  }
});

//ELIMINANDO UN ESTUDIANTE

app.delete("/estudiante/:rut", async (req, res) => {
  try {
    const { rut } = req.params;
    const estudiante = await Estudiante.remove(rut);
    return res.json(estudiante);
  } catch (error) {
    return res.status(500).json({ ok: false });
  }
});

//ACTUALIZAMOS EL ESTUDIANTE
app.put("/estudiante/:rut", async (req, res) => {
  try {
    const { rut } = req.params;
    const { curso, nivel, edad } = req.body;
    const newEstudiante = {
      rut,
      curso,
      nivel,
      edad,
    };
    const estudiante = await Estudiante.update(newEstudiante);
    return res.json(estudiante);
  } catch (error) {
    return res.status(500).json({ ok: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Conexión exitosa en el PORT ${PORT}`);
});
