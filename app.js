import express from "express";
import { validatePizza, validateColor } from "./my-validators.js";

const app = express();

app.set("view engine", "ejs");

app.get("/", validateColor, (req, res) => {
  res.render("index", { color: res.locals.color });
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Server ready!");
});

app.post("/orders", validatePizza, (req, res) => {
  if (res.locals.errors.length === 0) {
    res.render("success", { name: req.body.name, email: req.body.email });
  } else {
    res.status(422).render("error", { errors: res.locals.errors });
  }
});