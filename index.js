import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

/* =====================================================
   CONFIG
===================================================== */

const FRAMEWORK = "react"; // html | react | next
const ROOT_DIR = "generated-project";

/* =====================================================
   FILE WRITER
===================================================== */

function write(filePath, content) {
  const fullPath = path.join(ROOT_DIR, filePath);

  fs.mkdirSync(path.dirname(fullPath), { recursive: true });

  if (!content || content.trim().length < 30) {
    console.error("❌ Empty output for:", filePath);
    return;
  }

  fs.writeFileSync(fullPath, content.trim(), "utf8");
  console.log("✅", filePath);
}

/* =====================================================
   GROQ CALL
===================================================== */

async function groq(prompt) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "meta-llama/llama-4-maverick-17b-128e-instruct",
      temperature: 0,
      max_tokens: 4096,
      messages: [
        {
          role: "system",
          content: `
You are a senior frontend engineer.

Rules:
- Always generate Vite + React 18 code
- Never generate CRA
- Never use react-scripts
- Use ES modules
- Code must compile
- No markdown
- No explanations
- No placeholders
`
        },
        {
          role: "user",
          content: prompt
        }
      ]
    })
  });

  const data = await res.json();

  if (!data.choices?.length) {
    console.error("❌ Groq error:", data);
    return "";
  }

  return data.choices[0].message.content;
}

/* =====================================================
   VITE FILE STRUCTURE
===================================================== */

const REACT_FILES = [
  "index.html",
  "package.json",
  "vite.config.js",
  "src/main.jsx",
  "src/App.jsx",
  "src/components/Navbar.jsx",
  "src/components/Card.jsx",
  "src/components/Footer.jsx",
  "src/styles.css"
];

/* =====================================================
   GENERATOR
===================================================== */

async function generateFrontend(prompt) {
  console.log(`\n🚀 Generating VITE + REACT frontend...\n`);

  for (const file of REACT_FILES) {
    let content = await groq(`
Generate a FULL PRODUCTION-READY FILE.

Framework: Vite + React 18

File: ${file}

STRICT REQUIREMENTS:

If package.json:
- name: "vite-react-app"
- private: true
- type: module
- scripts:
  - dev: vite
  - build: vite build
  - preview: vite preview
- dependencies:
  react
  react-dom
- devDependencies:
  vite
  @vitejs/plugin-react

If index.html:
- root-level index.html
- script src="/src/main.jsx"

If vite.config.js:
- import react from "@vitejs/plugin-react"

Rules:
- Output ONLY valid code
- No markdown
- No explanations
- No comments outside code
- Must compile immediately

Website description:
${prompt}
`);

    if (!content || content.trim().length < 30) {
      console.log("🔁 Retrying:", file);
      content = await groq(`Return FULL FILE CONTENT ONLY for ${file}`);
    }

    write(file, content);
  }

  console.log(`
🎉 VITE PROJECT GENERATED SUCCESSFULLY

📁 Folder:
${ROOT_DIR}

🚀 Run:

cd ${ROOT_DIR}
npm install
npm run dev
`);
}

/* =====================================================
   START
===================================================== */

generateFrontend(`
Build a Zomato-style food delivery frontend website.

Features:
- Navbar with logo and city selector
- Restaurant cards
- Search bar
- Cuisine filters
- Ratings and delivery time
- Clean modern UI
- Mobile-first responsive design

Frontend only.
`);




// import dotenv from "dotenv";
// import { exec } from "node:child_process";
// import fs from "fs";
// import path from "path";

// dotenv.config();

// /* =====================================================
//    TOOLS
// ===================================================== */

// function getWeatherInfo(cityname) {
//   return `${cityname} weather is 25 Degree C with clear sky.`;
// }

// function executeCommand(command) {
//   return new Promise((resolve) => {
//     exec(command, (err, stdout, stderr) => {
//       resolve(stdout || stderr || err?.message);
//     });
//   });
// }

// /* ✅ FILE WRITER TOOL */
// function writeFileTool(input) {
//   const { filePath, content } = input;

//   const projectRoot = "generated-project";
//   const fullPath = path.join(projectRoot, filePath);

//   fs.mkdirSync(path.dirname(fullPath), { recursive: true });
//   fs.writeFileSync(fullPath, content, "utf8");

//   return `File written: ${filePath}`;
// }

// const TOOLS_MAP = {
//   getWeatherInfo,
//   executeCommand,
//   writeFile: writeFileTool,
// };

// /* =====================================================
//    SYSTEM PROMPT (UNCHANGED)
// ===================================================== */

// // const SYSTEM_PROMPT = `
// // You are an helpful AI assistant who is designed to resolve user query.
// // You work on START,THINK ACTION,OBSERVE and OUTPUT Mode.
// // In the start phase,user gives a query to you.
// // Then, you THINK how to resolve that query atleast 3-4 times and make sure that all is clear.
// // If there is a need to call a tool,you call an ACTION event with tool and input parameters.
// // If there is an action call, wait for the OBSERVE that is output of the tool.
// // Based on the OBSERVE from prev step, you either output or repeat the loop. 

// // Rules:
// // - Always wait for next step.
// // - Always output a single step and wait for the next step.
// // - Output must be strictly JSON
// // - Only call tool action from Available tools only.
// // - Strictly follow the output format in JSON. 

// // Available Tools:
// // - getWeatherInfo(city:string):string
// // - executeCommand(command):string
// // - writeFile({filePath,content}):string

// // Output Format:
// // {"step":"string","tool":"string","input":"object","content":"string"}
// // `;

// const SYSTEM_PROMPT = `
// You are a strict JSON-based autonomous agent.

// You operate in a loop with the following steps ONLY:
// - think
// - action
// - output

// RULES (MANDATORY):
// 1. Every response MUST be a SINGLE valid JSON object.
// 2. DO NOT include markdown, explanations, tables, or code blocks.
// 3. DO NOT include multiple JSON objects.
// 4. NEVER include text outside the JSON object.
// 5. NEVER batch multiple actions in one response.
// 6. If a tool is required, use EXACTLY ONE tool call per response.
// 7. If you use a tool, your step MUST be "action".
// 8. After an action, WAIT for the observe message before continuing.
// 9. Only move to "output" when the entire task is finished.
// 10. NEVER repeat files that are already created.
// 11. NEVER explain your reasoning to the user.
// 12. NEVER describe what you will do next outside of the "think" step.

// THINK STEP:
// - Decide the NEXT SINGLE atomic task only.
// - Do NOT plan multiple steps.
// - Do NOT mention tools explicitly.

// ACTION STEP:
// - Call exactly ONE tool.
// - Tool name MUST be one of:
//   - writeFile
//   - executeCommand
//   - getWeatherInfo
// - Input MUST exactly match the tool schema.

// OUTPUT STEP:
// - Provide a short confirmation message only.
// - Do NOT include code, markdown, or explanations.

// AVAILABLE TOOLS:
// - writeFile({ "filePath": string, "content": string }): string
// - executeCommand({ "command": string }): string
// - getWeatherInfo({ "city": string }): string

// RESPONSE FORMAT (STRICT):

// {
//   "step": "think | action | output",
//   "tool": "",
//   "input": {},
//   "content": ""
// }

// IMPORTANT:
// - If a file must be created, ALWAYS do it via writeFile.
// - One file = one action.
// - Never generate multiple files in one response.
// `
// /* =====================================================
//    AGENT LOOP
// ===================================================== */

// async function runAgent(userQuery) {
//   console.log("🚀 Agent started...\n");

//   const messages = [
//     { role: "system", content: SYSTEM_PROMPT },
//     { role: "user", content: userQuery },
//   ];


//   while (true) {
//     const res = await fetch(
//       "https://api.groq.com/openai/v1/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           model: "groq/compound", 
//           temperature: 0,
//           max_tokens: 900,
//           response_format: { type: "json_object" },  
//           messages,
//         }),
//       }
//     );

//     const data = await res.json();

//     if (data.error) {
//       console.error("Groq API error:", data.error.message);
//       return;
//     }

//     const assistantMessage = data.choices[0].message.content;

//     let parsed;
//     try {
//       parsed = JSON.parse(assistantMessage);
//     } catch {
//       console.error("❌ Invalid JSON:\n", assistantMessage);
//       return;
//     }

//     messages.push({
//       role: "assistant",
//       content: assistantMessage,
//     });

//     /* ---------- THINK ---------- */
//     if (parsed.step === "think") {
//       console.log("🤔 THINK:", parsed.content);
//       continue;
//     }

//     /* ---------- ACTION ---------- */
//     if (parsed.step === "action") {
//       console.log(`🛠 ACTION: ${parsed.tool}`);

//       const result = TOOLS_MAP[parsed.tool]
//         ? await TOOLS_MAP[parsed.tool](parsed.input)
//         : `Tool ${parsed.tool} not found`;

//       messages.push({
//         role: "user",
//         content: JSON.stringify({
//           step: "observe",
//           content: result,
//         }),
//       });

//       continue;
//     }

//     /* ---------- OUTPUT ---------- */
//     if (parsed.step === "output") {
//       console.log("\n✅ FINAL OUTPUT:");
//       console.log(parsed.content);
//       return;
//     }
//   }
// }

// /* =====================================================
//    START
// ===================================================== */

// runAgent(`

// Build a Zomato-style food ordering system.

// Create files using writeFile tool.

// Backend:
// - Node.js + Express
// - In-memory database
// - Routes:
//   - /restaurants
//   - /restaurants/:id/menu
//   - /cart
//   - /order
//   - /order/:id

// Frontend:
// - React app
// - Restaurant list
// - Menu page
// - Cart page
// - Order tracking page

// Output code by creating files.
// `);
