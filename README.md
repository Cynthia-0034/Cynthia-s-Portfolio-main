- Access the portfolio at `http://localhost:3000`.
- Navigate to sections like `#portfolio`, `#blog`, `#testimonials`, and `#contact` using the navbar.
- Toggle between light and dark modes using the theme switcher.
- Test features like submitting testimonials, sending contact form messages, or viewing blog posts at `/blog/:id`.

## Project Structure

- `index.html`: Main portfolio page with sections for home, about, portfolio, blog, testimonials, and contact.
- `styles.css`: Comprehensive stylesheet for responsive design, light/dark themes, and modern animations.
- `script.js`: Client-side JavaScript for dynamic features like portfolio filtering, blog loading, and form submissions.
- `server.js`: Express server handling API routes for projects, blogs, testimonials, and contact form emails.
- `seedProjects.js`: Script to seed sample projects into MongoDB.
- `seedBlogs.js`: Script to seed blog posts into MongoDB.
- `images/`: Folder for project and profile images (e.g., `me.jpg`, `ecommerce.jpg`).
- `resume.pdf`: Downloadable resume file.
- `.env`: Environment variables for email and MongoDB configuration (not committed).

## Database Schema Overview

The MongoDB database (`portfolio`) includes the following collections:

- **projects**: Stores portfolio projects with fields:
- `title` (String): Project name.
- `description` (String): Project details.
- `image` (String): Image URL or path.
- `category` (String): Category (e.g., web, app, design).
- `link` (String): Optional project URL.
- **blogs**: Stores blog posts with fields:
- `title` (String): Post title.
- `excerpt` (String): Short summary.
- `content` (String): Full post content.
- `createdAt` (Date): Creation date.
- **testimonials**: Stores client testimonials with fields:
- `name` (String): Client name.
- `role` (String): Client role (e.g., Client, Colleague).
- `content` (String): Testimonial text.
- `approved` (Boolean): Approval status (default: false).

## Key Features

### Portfolio
- Displays projects dynamically from MongoDB, with filters for categories (e.g., web, app, design).
- Features a lightbox for viewing project details with navigation arrows.
- Responsive grid layout with hover effects and bold visuals (e.g., `#ff6f61` accents).

### Blog
- Showcases five blog posts on topics like responsive design, UI/UX, WordPress, and JavaScript optimization.
- Dynamic rendering via `/blog/:id` with a clean, readable layout.
- Includes posts like:
- "Building a Responsive Site"
- "Designing a Bold Logo"
- "Creating a WordPress Theme from Scratch"
- "UI/UX Tips for Better User Engagement"
- "Optimizing Web Performance with JavaScript"

### Testimonials
- Allows clients to submit testimonials via a form.
- Displays approved testimonials in a carousel, managed via MongoDB.

### Contact Form
- Sends inquiries to your email using Nodemailer and Gmail.
- Includes validation and user feedback (e.g., "Message Sent!" animation).

### Design and Interactivity
- Light/dark mode toggle with localStorage persistence.
- Custom cursor, smooth scrolling, and scroll-triggered animations.
- Responsive design with mobile-first approach, using Flexbox and CSS Grid.
- Typography with Playfair Display for headings and Roboto for body text.
- Vibrant color scheme (e.g., `#ff6f61`, `#d4a5ff`) for a bold, modern look.

## Technologies

- **Front-End**:
- HTML5, CSS3, JavaScript (ES6+)
- Typed.js for typewriter effect
- Font Awesome for icons
- Google Fonts (Playfair Display, Roboto)
- **Back-End**:
- Node.js
- Express
- MongoDB (via Mongoose)
- Nodemailer for email functionality
- **Dependencies** (see `package.json`):
- `express`: Web framework
- `mongoose`: MongoDB ORM
- `nodemailer`: Email sending
- `cors`: Cross-origin resource sharing
- `dotenv`: Environment variable management

## Seed Data

- **Projects**: Includes sample projects like "E-commerce Platform" and "Personal Blog" (via `seedProjects.js`).
- **Blogs**: Includes five blog posts with sample content (via `seedBlogs.js`).
- Run `node seedProjects.js` and `node seedBlogs.js` to populate the database.

## Deployment

To deploy on Render:
1. Push the repository to GitHub (`Cynthia-0034/Cynthia-s-Portfolio-main`).
2. Create a Web Service on [Render](https://render.com).
3. Set environment variables in Render:
4. Configure:
- **Build Command**: `npm install`
- **Start Command**: `npm start`
5. Access the live site at `https://your-portfolio.onrender.com`.

## Author

Cynthia Kiprop  
- [GitHub](https://github.com/Cynthia-0034)  
- [LinkedIn](https://linkedin.com/in/cynthia-kiprop)  
- [Instagram](https://instagram.com/cynthia_kiprop)

## License

ISC

## Acknowledgments

- Inspired by modern portfolio designs and my passion for coding and design.
- Thanks to MongoDB Atlas for free database hosting and Render for seamless deployment.
