const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", blogSchema);

const blogs = [
  {
    title: "Building a Responsive Site",
    excerpt: "A deep dive into my latest project with tips for beginners.",
    content: `Lately, I’ve been working on a project that’s pushed me to rethink how I approach web design: a fully responsive site that adapts seamlessly across devices. Responsive design is crucial in today’s multi-device world, ensuring users have a consistent experience whether on a phone, tablet, or desktop.\n\nHere are some key takeaways:\n1. **Use Relative Units**: Embrace \`vw\`, \`vh\`, \`rem\`, and \`em\` for scalability.\n2. **Media Queries**: Tailor CSS for different screen sizes (e.g., \`@media (max-width: 768px)\`).\n3. **Flexbox and Grid**: These CSS tools make layouts flexible and intuitive.\n\nFor beginners, start with a mobile-first approach—it simplifies scaling up. Test early and often with tools like Chrome DevTools.\n\nGot a responsive project of your own? I’d love to hear about it—drop a comment below!`,
  },
  {
    title: "Designing a Bold Logo",
    excerpt: "How I crafted a unique brand identity from scratch.",
    content: `A logo is more than just a pretty graphic—it’s the heartbeat of a brand, the first thing people notice, and often the last thing they remember. Recently, I designed a logo for a startup, aiming for bold, memorable, and versatile.\n\nMy process:\n1. **Research**: Understand the brand’s values and audience.\n2. **Sketching**: Generate multiple concepts on paper.\n3. **Digital Tools**: Use Adobe Illustrator for precision and scalability.\n4. **Feedback**: Iterate based on client input.\n\nTips for designers: Keep it simple, ensure it works in black and white, and test it at small sizes.\n\nHave you tackled a branding project lately? Share your thoughts or drop a sketch in the comments!`,
  },
  {
    title: "Creating a WordPress Theme from Scratch",
    excerpt:
      "A step-by-step guide to building a custom WordPress theme for your portfolio.",
    content: `WordPress powers over 40% of the web, making it a fantastic platform for showcasing your portfolio. As a developer, I recently built a custom WordPress theme to highlight my projects, and it was a game-changer for flexibility and branding.\n\nHere’s how I did it:\n1. **Set Up a Theme Folder**: Create a folder in \`wp-content/themes/\` (e.g., \`cynthia-theme\`) with \`style.css\` and \`index.php\`. Add theme metadata in \`style.css\` (e.g., Theme Name, Author).\n2. **Build Core Files**: Include \`functions.php\` for enqueuing styles/scripts, \`header.php\`, and \`footer.php\` for reusable layouts.\n3. **Create Templates**: Design \`page.php\` for static pages and \`single.php\` for blog posts, using WordPress loops (\`while (have_posts())\`).\n4. **Style with CSS**: Use a bold color scheme (like my signature #ff6f61) and responsive grids for a modern look.\n5. **Test Thoroughly**: Preview with WordPress’s Theme Unit Test data.\n\nPro tip: Use \`wp_enqueue_style\` to load fonts like Playfair Display for headings. For beginners, start with a child theme to learn the ropes.\n\nHave you tried customizing WordPress? Share your theme tips below!`,
  },
  {
    title: "UI/UX Tips for Better User Engagement",
    excerpt:
      "Simple design principles to make your websites more intuitive and engaging.",
    content: `As a graphic designer, I’ve learned that great UI/UX isn’t just about aesthetics—it’s about creating intuitive experiences that keep users coming back. Here are my top tips for boosting engagement:\n\n1. **Prioritize Clarity**: Use clear typography (e.g., Roboto for body text) and avoid clutter. Ensure buttons stand out (I love #ff6f61 for CTAs).\n2. **Embrace White Space**: Give elements room to breathe for a clean, professional look.\n3. **Add Micro-Interactions**: Hover effects or subtle animations (e.g., a button scaling up) delight users.\n4. **Test with Users**: Tools like Figma’s prototyping or Hotjar’s heatmaps reveal how users interact with your design.\n5. **Optimize for Mobile**: Design mobile-first to ensure responsiveness.\n\nMy recent portfolio redesign used these principles, resulting in a 20% increase in user time on page (based on my analytics). Start small—tweak one element and test the impact.\n\nWhat’s your go-to UI/UX trick? Let’s swap ideas!`,
  },
  {
    title: "Optimizing Web Performance with JavaScript",
    excerpt: "Practical techniques to speed up your website using JavaScript.",
    content: `A fast website is crucial for user satisfaction and SEO. As a web developer, I’ve optimized several projects using JavaScript to reduce load times and improve performance. Here’s what works:\n\n1. **Lazy Load Images**: Use \`IntersectionObserver\` to load images only when they enter the viewport.\n2. **Debounce Event Listeners**: For scroll or resize events, debounce functions to limit execution (e.g., Lodash’s \`debounce\`).\n3. **Minify and Bundle**: Use tools like Webpack to minify JS files, reducing file size.\n4. **Avoid Blocking Scripts**: Load non-critical JS with \`defer\` or \`async\` attributes.\n5. **Cache Data**: Store API responses in \`localStorage\` to avoid redundant fetches.\n\nIn my portfolio, lazy-loading images cut initial load time by 30%. For beginners, start with \`defer\` on scripts—it’s a quick win.\n\nHow do you optimize your sites? Share your performance hacks below!`,
  },
];

Blog.deleteMany({})
  .then(() => Blog.insertMany(blogs))
  .then(() => {
    console.log("Blogs seeded successfully");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error seeding blogs:", err);
    mongoose.connection.close();
  });
