import express from "express";
import { validatePizza, validateColor } from "./my-validators.js";

const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Server ready!");
});

app.post("/orders", validatePizza, (req, res) => {
  if (res.locals.errors.length === 0) {
    res.json(req.body);
  } else {
    res.status(422).json(res.locals.errors);
  }
});
