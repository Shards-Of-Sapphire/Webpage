# 🌌 Sapphire

**Sapphire** is a creative, student-led innovation group with projects spanning AI, game development, legal tech, and educational tools. This is the official website that showcases our vision, mission, team, and portfolio of projects.

---

## 🚀 Live Website

🌐 [Visit the website](https://shards-of-sapphire.github.io/Webpage/)

---

## 📁 Project Structure

├── index.html # Main website structure
├── styles.css # Custom styles for layout, sections, and responsive design
├── script.js # Front-end logic including smooth scroll, form handling, etc.
├── /images/ # Project and team logos (optional folder)
└── README.md # You're reading this!
---

## 📌 Features

- 🎯 **Landing Page** – Introduction to Sapphire's philosophy
- 🧑‍🤝‍🧑 **Team Section** – Bios of all core members
- 🛠️ **Projects** – LegalEase, SkillSphere, Guardian Angel, MindQuest, SnakeGame
- 🌐 **Contact Form** – Integrated with [EmailJS](https://emailjs.com) to receive user messages
- 🎨 **Responsive Design** – Optimized for both desktop and mobile

---

## ✍️ Blog and publishing

- Visit [`/blog/`](https://shards-of-sapphire.github.io/Webpage/blog/) to browse published posts.
- To publish, add the article as Markdown under `blogs/posts/` and add its details to `blogs/index.json`. Push both files to the `main` branch; there is no CMS login or separate authentication service.
- Set `"published": true` in the index entry to show the post. Drafts marked `false` stay hidden.

Each index entry has this shape:

```json
{
  "slug": "your-post-title",
  "title": "Your post title",
  "date": "2026-11-08",
  "author": "Your name",
  "summary": "A short preview shown on the homepage and blog list.",
  "image": "images/your-cover.jpg",
  "published": true
}
```

Save the article body at `blogs/posts/your-post-title.md`, matching the `slug`. The `image` field is optional; when used, add the image inside `blogs/` and use a path relative to `blogs/index.json`.

---

## 📬 Contact Form Integration

The contact form uses [EmailJS](https://emailjs.com) for sending emails without a backend. Fields include:

- `user_name`
- `user_email`
- `subject`
- `message`

Ensure your EmailJS template matches these variable names.

---

## 🛠️ Deployment

- **GitHub Pages**
---

## 📄 License

MIT License — feel free to modify and reuse with credit.

---

## 🧠 About Sapphire

*"Out-grow; Beyond, Incomprehensible to others."*  
We are a movement of innovators, learners, and creators. Built from spark, strengthened by will.
