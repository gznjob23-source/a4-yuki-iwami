import validator from "validator";

export const validatePizza = (req, res, next) => {
  res.locals.errors = [];

  const validSauces = ["tomato", "alfredo"];
  if (!validSauces.includes(req.body.sauce)) {
    res.locals.errors.push({ field: "sauce", message: "Invalid sauce." });
  }

  const validToppings = ["pepperoni", "ham", "vegetariansausage", "mushrooms", "peppers", "olives"];
  let toppings = req.body.toppings;

  if (toppings === undefined) {
    toppings = [];
  } else if (typeof toppings === "string") {
    toppings = [toppings];
  }

  if (toppings.length < 1 || toppings.length > 3) {
    res.locals.errors.push({ field: "toppings", message: "Choose 1 to 3 toppings." });
  }

  let invalidFound = false;
  for (let i = 0; i < toppings.length; i++) {
    if (!validToppings.includes(toppings[i])) {
      invalidFound = true;
    }
  }
  if (invalidFound) {
    res.locals.errors.push({ field: "toppings", message: "Invalid topping." });
  }

  const name = validator.trim(req.body.name || "");
  req.body.name = name;
  if (name.length < 3 || name.length > 30) {
    res.locals.errors.push({ field: "name", message: "Name must be 3 to 30 chars." });
  }

  const email = req.body.email || "";
  if (!validator.isEmail(email)) {
    res.locals.errors.push({ field: "email", message: "Invalid email." });
  }

  next();
};

export const validateColor = (req, res, next) => {
  let color = req.query.color;

  if (!color || !validator.isHexColor(color.replace("#", ""))) {
    color = "#fffeed";
  }

  res.locals.color = color;
  next();
};