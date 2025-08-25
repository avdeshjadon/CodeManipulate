# 🔄 CodeManipulate — AI-Powered Code Language Converter & Formatter

🚀 **CodeLangConvert** is a lightning-fast and smart web app that lets you **auto-detect** the programming language of your input code and **convert** it to another language. 

> 🧠 Converts up to **5000 characters** of code across 20+ popular languages and even formats the code for supported ones!

---

## ✨ Features

- 🔍 **Auto-Detect** the source programming language from pasted code.
- 🔁 **Convert** code between multiple programming languages using AI.
- 🧹 **Format** code neatly for supported languages (see below).
- 📂 Supports **.js, .py, .cpp, .ts, .json**, and more file uploads.
- 🌗 **Light & Dark Mode** for easy reading.
- 🌐 Fully hosted on **GitHub Pages**: [Visit WebPage](https://avdeshjadon.github.io/CodeManipulate)

---

## 🛠️ Supported Formatting Languages

This tool supports **code formatting** for the following languages:

> ✅ HTML, CSS, SCSS, LESS, JavaScript, JSX, TypeScript, TSX, JSON, JSON5, JSONC, Markdown, MDX, GraphQL, YAML, Vue, Handlebars

---

## 🧠 Tech Stack

| Layer         | Tech Used                |
|---------------|--------------------------|
| 🌐 Frontend   | HTML, CSS, JavaScript    |
| 🧪 Backend    | Node.js, Express.js      |
| 🧠 AI Engine  | Google Generative AI     |
| 🌍 Hosting    | GitHub Pages             |
| 🔐 Env Mgmt   | dotenv                   |
| 🌐 Others     | body-parser, CORS        |

---

## 📦 Folder Structure

```
CHANGELANG/
├── images/                          (📁 Contains static images/icons used in the website)
│   └── favicon.ico                  (🌟 Favicon for the browser tab icon)
│
├── node_modules/                    (📁 Installed dependencies via npm; auto-generated folder)
│
├── public/                          (📁 Main public-facing files for frontend)
│
│   ├── css/                         (📁 All stylesheets used for styling the frontend)
│   │   ├── formatter.css            (🎨 Styles specifically for the formatter page/component)
│   │   └── style.css                (🎨 General styles for the main index/home page)
│
│   ├── script/                      (📁 JavaScript files for app logic & functionality)
│   │   ├── formatter.js             (🧠 Handles code formatting using supported libraries)
│   │   └── main.js                  (🧠 Controls UI interactions, language conversion, theme toggling)
│
│   ├── formatter.html               (📝 Dedicated page for code formatting feature only)
│   └── index.html                   (🏠 Main homepage with language detection & code conversion)
│
├── .env                             (🔐 Stores API keys like Google Gemini — not shared publicly)
├── .gitignore                       (🚫 Tells Git to ignore files/folders like node_modules, .env)
│
├── package.json                     (📦 Declares project metadata, scripts, and dependencies)
├── package-lock.json                (📦 Auto-generated file that locks dependency versions for reproducibility)
│
├── server.js                        (🖥️ Node.js + Express backend server to handle API requests to Gemini)
└── README.md                        (📘 Documentation about your project, features, usage, etc.)


```

---

## 📸 Screenshots

### 🔽 Language Selection Popup
![Language Selection](./images/Screenshot.png)

---

## 🔗 Live Demo

🌐 **Hosted on GitHub Pages**:  
➡️ [Visit Website](https://avdeshjadon.github.io/CHANGELANG)

---

## 📥 Installation (Optional for Local Use)

```bash
git clone https://github.com/avdeshjadon/CHANGELANG.git
cd CHANGELANG
npm install
node server.js
```


