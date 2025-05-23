const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const Project = mongoose.model(
  "Project",
  new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    category: String,
    link: String,
  })
);

const projects = [
  {
    title: "E-commerce Platform",
    description: "A fully responsive e-commerce site with payment integration.",
    image: "./images/ecommerce.jpg",
    category: "web",
    link: "https://example.com",
  },
  {
    title: "Personal Blog",
    description: "A clean blog with dynamic content and comments.",
    image: "./images/blog.jpg",
    category: "web",
    link: "https://example.com",
  },
];

Project.deleteMany({})
  .then(() => Project.insertMany(projects))
  .then(() => {
    console.log("Projects seeded");
    mongoose.connection.close();
  })
  .catch((err) => console.error("Error seeding projects:", err));
