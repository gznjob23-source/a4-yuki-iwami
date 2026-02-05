import express from "express";

const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Server ready!");
});

app.post("/orders", (req, res) => {
  res.json(req.body);
});
