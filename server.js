const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const characters = require("./characters.json");




app.get("/", (req, res) => {
  res.json({
    message: "API de Regretevator",
    endpoints: {
      allCharacters: "/characters",
      characterById: "/characters/:id",
      searchByName: "/characters/search?name=PartyNoob"
    }
  });
});


app.get("/characters", (req, res) => {
  res.json(characters);
});


app.get("/characters/search", (req, res) => {
  const name = req.query.name;

  if (!name) {
    return res.status(400).json({ error: "Debes proporcionar un nombre" });
  }

  const result = characters.filter(c =>
    c.name.toLowerCase().includes(name.toLowerCase())
  );

  res.json(result);
});

app.get("/characters/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const character = characters.find(c => c.id === id);

  if (!character) {
    return res.status(404).json({ error: "Personaje no encontrado" });
  }

  res.json(character);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

