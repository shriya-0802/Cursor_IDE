
## Cursor IDE – AI Frontend Project Generator

Cursor IDE is an AI-powered frontend project generator that creates complete, production-ready frontend applications from a single prompt.

It supports modern frontend stacks including HTML, React (Vite), and Next.js, and generates full project structures with clean, compilable code.

The goal of this project is to eliminate repetitive frontend setup and accelerate UI prototyping using large language models.



## Features

- Generate full frontend projects automatically
- Supports multiple frameworks:
  - HTML / CSS / JavaScript
  - React 18 with Vite
  - Next.js App Router
- Produces complete file structures
- Clean and readable source code
- No placeholders or partial files
- Production-ready configuration
- Environment-safe API usage
- Works entirely from the command line

---

## Supported Frameworks

| Framework | Description |
|--------|-------------|
| HTML | Static websites using vanilla JS and CSS |
| React | Vite + React 18 frontend applications |
| Next.js | App Router–based Next.js projects |

---

## Example Generated Structure (React)

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

````

---

## Tech Stack

- Node.js
- JavaScript (ES Modules)
- Groq LLM API
- React 18
- Vite
- Next.js
- dotenv

---

## Installation

Clone the repository:

```bash
git clone https://github.com/shriya-0802/Cursor_IDE.git
cd Cursor_IDE
````

Install dependencies:

```bash
npm install
```

or

```bash
pnpm install
```

---

## Environment Configuration

Create a `.env` file in the project root:

```
GROQ_API_KEY=your_api_key_here
```

The `.env` file is ignored via `.gitignore` and should never be committed.

---

## Usage

Run the generator:

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

## Configuration

Select the framework inside `index.js`:

```js
const FRAMEWORK = "react";
```

Available options:

```
html
react
next
```

---

## Example Prompt

```js
generateFrontend(`
Build a Zomato-style food delivery frontend website.

Features:
- Navbar with logo and city selector
- Search bar
- Restaurant cards
- Cuisine filters
- Ratings
- Responsive layout

Frontend only.
`);
```

---




## Roadmap

* Tailwind CSS integration
* Shadcn UI support
* Router generation
* State management templates
* Backend scaffolding
* GitHub repo auto-creation
* Deployment templates (Vercel / Netlify)

---

## Author

**Shriya**

GitHub:
[https://github.com/shriya-0802](https://github.com/shriya-0802)

---

