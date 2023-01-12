import express from "express";
const app = express();
import expressLayouts from "express-ejs-layouts";
import morgan from "morgan";
const port = 3000;

// Using EJS
app.set("view engine", "ejs");

// Third-party middleware
app.use(expressLayouts);
app.use(morgan("dev"));

// Built-in middleware
app.use(express.static("public"));

// Application level middleware
app.use((req, res, next) => {
  console.log(`Time: ${Date.now()}`);
  next();
});

app.get("/", (req, res) => {
  const siswa = [
    {
      nama: "Zidan Abraham",
      email: "zidan@gmail.com",
    },
    {
      nama: "I Nyoman Suryadana",
      email: "surya@gmail.com",
    },
    {
      nama: "Rizky Ryan",
      email: "rizky@gmail.com",
    },
  ];
  res.render("index", {
    layout: "layouts/main-layout.ejs",
    title: "Home",
    nama: "Zidan Abraham",
    siswa,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout.ejs",
    title: "About",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    layout: "layouts/main-layout.ejs",
    title: "Contact",
  });
});

app.get("/product/:id", (req, res) => {
  res.send(`Product ID: ${req.params.id} Category: ${req.query.category}`);
});

app.use("/", (req, res) => {
  res.status(404);
  res.send(`<h1>404 Not Found</h1>`);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
