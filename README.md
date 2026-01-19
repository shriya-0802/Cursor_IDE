

```md
# Cursor IDE – AI Frontend Generator 🚀

An AI-powered frontend project generator that automatically creates complete **production-ready frontend applications** using **HTML, React (Vite), or Next.js**.

This tool uses the **Groq LLM API** to generate full frontend file structures with clean code — no placeholders, no markdown, no partial output.

---

## ✨ Features

- ⚡ Generate **Vite + React projects** (not CRA)
- 🌐 Supports:
  - HTML / CSS / JS
  - React (Vite)
  - Next.js App Router
- 📁 Auto-creates full folder structure
- 🧠 Uses Groq LLM for fast generation
- 🧩 Generates:
  - Components
  - Styling
  - Config files
  - Entry files
- ❌ No boilerplate
- ✅ Production-ready code
- 🔐 Environment-safe (API keys via `.env`)

---

## 📂 Generated Project Structure (React Example)

```

generated-project/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── styles.css
│   └── components/
│       ├── Navbar.jsx
│       ├── Card.jsx
│       └── Footer.jsx

```

---

## 🛠️ Tech Stack

- **Node.js**
- **Groq LLM API**
- **JavaScript (ES Modules)**
- **Vite**
- **React 18**
- **dotenv**
- **Fetch API**

---

## 🔑 Environment Setup

Create a `.env` file in the root directory:

```

GROQ_API_KEY=your_groq_api_key_here

````

⚠️ Never commit `.env` to GitHub.

---

## 📦 Installation

```bash
npm install
````

or

```bash
pnpm install
```

---

## ▶️ Run the generator

```bash
pnpm run dev
```

After generation:

```bash
cd generated-project
npm install
npm run dev
```

---

## ⚙️ Configuration

Inside `index.js`:

```js
const FRAMEWORK = "react";
```

Supported values:

```
"html"
"react"
"next"
```

---

## 🧠 Example Prompt

```js
generateFrontend(`
Build a Zomato-style food delivery frontend website.

Features:
- Navbar with logo and city selector
- Search bar
- Restaurant cards
- Cuisine filters
- Ratings
- Responsive mobile-first layout

Frontend only.
`);
```

---

## ✅ Guarantees

* ✔ Complete files only
* ✔ No markdown in output
* ✔ No explanations from AI
* ✔ Correct imports & exports
* ✔ Vite-compatible structure
* ✔ React 18
* ✔ Clean UI-ready components





## 🚀 Future Improvements

* Tailwind CSS integration
* Shadcn UI support
* Multi-page routing
* Zustand / Redux store setup
* Backend generator
* Auto GitHub repo creation
* Deployment templates (Vercel / Netlify)

---

## 👩‍💻 Author

**Shriya**

GitHub:
[https://github.com/shriya-0802](https://github.com/shriya-0802)



⭐ If you found this useful, consider starring the repository!




