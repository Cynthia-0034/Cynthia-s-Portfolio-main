const express = require("express");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, ".")));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Project Schema
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  link: { type: String },
});

const Project = mongoose.model("Project", projectSchema);

// Testimonial Schema
const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  content: { type: String, required: true },
  approved: { type: Boolean, default: false },
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

// Blog Schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", blogSchema);

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Contact Form Endpoint
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// Get All Projects Endpoint
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// Submit Testimonial Endpoint
app.post("/api/testimonials", async (req, res) => {
  const { name, role, content } = req.body;

  if (!name || !role || !content) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const testimonial = new Testimonial({ name, role, content });
    await testimonial.save();
    res.status(201).json({ message: "Testimonial submitted successfully" });
  } catch (error) {
    console.error("Error submitting testimonial:", error);
    res.status(500).json({ error: "Failed to submit testimonial" });
  }
});

// Get Approved Testimonials Endpoint
app.get("/api/testimonials", async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ approved: true });
    res.status(200).json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res.status(500).json({ error: "Failed to fetch testimonials" });
  }
});

// Get All Blogs Endpoint
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// Get Single Blog Endpoint
app.get("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

// Dynamic Blog Post Route
app.get("/blog/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${blog.excerpt}" />
        <title>${blog.title} | Cynthia Kiprop</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <nav class="navbar">
          <div class="logo">
            <span class="logo-text">CynthiaKiprop</span>
            <span class="logo-accent"></span>
          </div>
          <ul class="nav-links">
            <li><a href="/#home" class="nav-link">Home</a></li>
            <li><a href="/#about" class="nav-link">About</a></li>
            <li><a href="/#portfolio" class="nav-link">Portfolio</a></li>
            <li><a href="/#blog" class="nav-link active">Blog</a></li>
            <li><a href="/#testimonials" class="nav-link">Testimonials</a></li>
            <li><a href="/#contact" class="nav-link">Contact</a></li>
          </ul>
          <button class="theme-toggle" role="switch" aria-checked="false" aria-label="Toggle between dark and light mode">
            <span class="toggle-icon">
              <i class="fas fa-moon"></i>
              <i class="fas fa-sun"></i>
            </span>
          </button>
          <i class="fas fa-bars hamburger"></i>
        </nav>
        <section class="blog-content">
          <h1>${blog.title}</h1>
          <p>${blog.content.replace(/\n/g, "<br>")}</p>
          <a href="/#blog" class="btn">Back to Blog</a>
        </section>
        <footer>
          <div class="footer-bottom">
            <p>© 2025 <span class="highlight">Cynthia Kiprop</span>. All rights reserved.</p>
          </div>
        </footer>
        <script src="/script.js"></script>
      </body>
      </html>
    `);
  } catch (error) {
    console.error("Error rendering blog:", error);
    res.status(500).send("Server error");
  }
});

// Catch-All Route for Main Portfolio
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});