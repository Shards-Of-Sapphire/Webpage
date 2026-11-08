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
- Visit [`/admin/`](https://shards-of-sapphire.github.io/Webpage/admin/) to write and publish posts with Decap CMS.
- Blog content is stored in `content/blog.json`; only posts with **Published** enabled appear on the site.
- The CMS uses the GitHub backend for `Shards-Of-Sapphire/Webpage` on the `main` branch. Editors need GitHub write access to that repository.

### One-time CMS authentication setup

GitHub Pages is static and cannot safely hold GitHub OAuth credentials. Before editors can sign in to `/admin/`, configure an OAuth provider:

1. Create a GitHub OAuth App. Set its authorization callback URL to `https://api.netlify.com/auth/done`.
2. In Netlify, configure the GitHub OAuth provider for a site and enter the OAuth App's client ID and secret. The website can continue to be hosted on GitHub Pages; Netlify is used only for the CMS authentication service.
3. Keep the OAuth client secret in Netlify's provider settings. Never put it in this repository or in the browser.
4. Sign in at `/admin/` with a GitHub account that has write access to the repository.

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
