# Academic Personal Website Template

A modern, highly-polished, and modular personal website template built for academics, researchers, and PhD students. It is designed to be easily extensible, visually premium, and lightning-fast. 

Built beautifully with **Next.js 16**, **Tailwind CSS**, **Framer Motion**, and **shadcn/ui**.

## 🌟 Features
- **Extremely Modular:** Constructed with semantic React components instead of generic sprawling `<div>` tags making adding new sections intuitive.
- **Data-Driven:** All core data (projects, news, CV, social links, papers) is managed in easily-editable JSON config files in the `/src/content/` directory. No need to hunt through TSX files!
- **Dark Mode Support:** Fluid and instantaneous dark/light mode toggling utilizing `next-themes` and a meticulously crafted custom color-palette.
- **BibTeX Integration:** Built-in copy-to-clipboard functionality for paper abstracts and citations.
- **Fully Responsive:** Perfectly tailored styles wrapping efficiently on both ultrawide desktop monitors and mobile devices without overflowing horizontal panels.

---

## 🚀 Getting Started

First, install the required dependencies:

```bash
npm install
```

Then, run the development server locally:
```bash
npm run dev
```
Navigate to `http://localhost:3000` to view the website. 

---

## 🛠️ How to Customize for Yourself

This template is built so you can deploy your own instance rapidly without touching the core UI components. All your personal data is driven from JSON!

### 1. Update Site Constants
Navigate to `src/content/site-config.json`.
Here you can update your Name, exact job Title, Affiliation, short Tagline, and all your social media links (Google Scholar, Github, LinkedIn, X, Orcid).

### 2. Update the "About Me" & "News" Sections
Navigate to `src/content/about.json`. 
Update the `bio` array for paragraphs, and add objects into the `news` array. The dates will automatically be formatted with circular badges!

### 3. Upload your Photo
Add a crisp photo to `public/images/profile.svg` (or `.jpg`/`.png`) and update the `profileImage` string inside `site-config.json` to point your image.

### 4. Updating Publications
Put your papers into `src/content/publications.json`. The `PublicationCard` component will automatically generate PDF, Code, Video, and BibTeX button actions based on which fields you provide!

---

## 💻 Tech Stack Overview
- Framework: [Next.js App Router](https://nextjs.org/)
- Styling: [TailwindCSS](https://tailwindcss.com/)
- Animations: [Framer Motion](https://www.framer.com/motion/)
- UI Components: [shadcn/ui](https://ui.shadcn.com/)
- Icons: [Lucide React](https://lucide.dev/)

*Feel free to star, fork, and use this template for your own academic profile! Contributions and feature requests are always welcome.*
