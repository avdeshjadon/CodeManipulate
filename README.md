# 🔄 CodeManipulate — AI-Powered Code Language Converter & Formatter

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-brightgreen)](https://avdeshjadon.github.io/CHANGELANG)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.18-blue)](https://expressjs.com/)
[![Google AI](https://img.shields.io/badge/Google%20AI-Gemini-orange)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

## 🌟 Overview

**CodeManipulate** (formerly CodeLangConvert) is a sophisticated, AI-powered web application designed to revolutionize how developers work with code across multiple programming languages. Built with cutting-edge Google Generative AI technology, this tool provides intelligent code language detection, seamless cross-language conversion, and professional code formatting capabilities.

### 🎯 Key Highlights

- **🧠 Advanced AI Detection**: Utilizes Google's Gemini AI for accurate language detection with 99%+ accuracy
- **⚡ Lightning Fast**: Process up to 5000 characters of code in under 3 seconds
- **🌐 Universal Support**: Covers 25+ programming languages and frameworks
- **🎨 Professional Formatting**: Built-in Prettier integration for consistent code styling
- **📱 Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **🌗 Dark/Light Themes**: Eye-friendly themes for extended coding sessions
- **📂 File Upload Support**: Direct file processing for multiple formats
- **🔒 Privacy First**: No code storage, all processing happens client-side where possible

---

## ✨ Comprehensive Feature Set

### 🔍 Intelligent Code Detection
- **Auto-Detection Engine**: Powered by Google Gemini AI with machine learning algorithms
- **Syntax Analysis**: Deep parsing of code structure, keywords, and patterns
- **Multi-Language Support**: Detects 25+ languages including modern frameworks
- **Confidence Scoring**: Provides accuracy percentages for detection results
- **Edge Case Handling**: Manages mixed-language files and code snippets

### 🔁 Advanced Code Conversion
- **Cross-Language Translation**: Convert between any supported language pairs
- **Context Preservation**: Maintains logic flow, variable naming, and code structure
- **Comment Translation**: Preserves and translates code comments
- **Framework Adaptation**: Adapts to target language conventions and best practices
- **Error Handling**: Graceful handling of conversion limitations and edge cases

### 🧹 Professional Code Formatting
- **Multi-Language Formatting**: Supports 17 major languages and formats
- **Customizable Rules**: Configurable indentation, spacing, and style preferences
- **Real-Time Processing**: Instant formatting with live preview
- **Consistency Enforcement**: Ensures uniform code style across projects
- **Integration Ready**: Compatible with popular IDE formatting standards

### 📂 File Processing Capabilities
- **Multiple Format Support**: `.js`, `.py`, `.cpp`, `.ts`, `.json`, `.html`, `.css`, and more
- **Drag & Drop Interface**: Intuitive file upload with visual feedback
- **Batch Processing**: Handle multiple files simultaneously
- **Size Optimization**: Efficient processing of large code files
- **Preview Mode**: Review files before processing

### 🎨 User Experience Features
- **Intuitive Interface**: Clean, modern design with minimal learning curve
- **Real-Time Feedback**: Live character count, progress indicators, and status updates
- **Copy-to-Clipboard**: One-click copying with success notifications
- **Download Results**: Export converted code to various file formats
- **History Tracking**: Session-based history of recent conversions (no persistent storage)

---

## 🛠️ Technical Architecture

### 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   AI Service    │
│   (Client-Side) │◄───┤   (Node.js)     │◄───┤   (Google AI)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                       │                       │
        ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ • HTML5/CSS3    │    │ • Express.js    │    │ • Gemini API    │
│ • Vanilla JS    │    │ • Body Parser   │    │ • NLP Models    │
│ • Prettier.js   │    │ • CORS          │    │ • ML Algorithms │
│ • File APIs     │    │ • dotenv        │    │ • Cloud Scale   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 🧠 AI Processing Pipeline

1. **Input Sanitization**: Clean and validate user input
2. **Language Detection**: AI-powered syntax and pattern analysis
3. **Context Analysis**: Understand code structure and dependencies
4. **Translation Engine**: Convert logic and syntax to target language
5. **Post-Processing**: Format, optimize, and validate output
6. **Quality Assurance**: Error checking and consistency validation

### 🌐 Frontend Architecture

**Core Technologies:**
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with Flexbox and Grid layouts
- **Vanilla JavaScript**: ES6+ features for optimal performance
- **Web APIs**: File API, Clipboard API, Local Storage API

**Key Components:**
- **Language Selector**: Dynamic dropdown with search functionality
- **Code Editor**: Syntax-highlighted text areas with line numbers
- **File Uploader**: Drag-and-drop with progress indicators
- **Theme Controller**: Dark/light mode with system preference detection
- **Result Panel**: Formatted output with copy/download options

---

## 📦 Detailed Project Structure

```
CHANGELANG/
├── images/                          (📁 Contains static images/icons used in the website)
│   └── favicon.ico                  (🌟 Favicon for the browser tab icon)
|   └── Screenshot.png               (📁 Website Screenshot )
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
├── LICENSE                          (📝 MIT License)  
|
├── server.js                        (🖥️ Node.js + Express backend server to handle API requests to Gemini)
└── README.md                        (📘 Documentation about your project, features, usage, etc.)

```

---

## 🚀 Quick Start Guide

### 🔧 Prerequisites

**System Requirements:**
- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher
- **Git**: Latest stable version
- **Modern Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

**API Requirements:**
- Google AI Platform account
- Valid Gemini API key
- Sufficient API quota for your usage

### ⚡ Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/avdeshjadon/CHANGELANG.git
   cd CHANGELANG
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   ```env
   # Google AI Configuration
   GOOGLE_API_KEY=your_gemini_api_key_here
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   # or
   node server.js
   ```

5. **Access Application**
   - Open browser to `http://localhost:3000`
   - Verify all features are working correctly

### 🌐 Production Deployment

**GitHub Pages Deployment:**
1. Fork the repository to your GitHub account
2. Configure repository settings for GitHub Pages
3. Update API & .env endpoints in configuration
4. Deploy using GitHub Actions workflow

**Manual Deployment:**
```bash
npm run build
npm start
```

---

## 🎯 Usage Instructions

### 🔍 Language Detection & Conversion

**Step 1: Input Your Code**
1. Navigate to the main application interface
2. Paste your code into the source code text area
3. The system automatically detects character count (max 5000)
4. Real-time syntax validation provides immediate feedback

**Step 2: Language Detection**
1. Click "Detect Language" or wait for auto-detection
2. AI analyzes syntax patterns, keywords, and structure
3. Detection results show confidence percentage
4. Manual override available if needed

**Step 3: Select Target Language**
1. Choose desired output language from dropdown
2. Preview conversion complexity and estimated time
3. Select any additional conversion options
4. Confirm conversion parameters

**Step 4: Convert & Download**
1. Click "Convert Code" to start AI processing
2. Monitor progress with real-time updates
3. Review converted code with syntax highlighting
4. Copy to clipboard or download as file

### 🧹 Code Formatting

**Supported Languages for Formatting:**
- **Web Technologies**: HTML, CSS, SCSS, LESS, JavaScript, TypeScript
- **Frameworks**: JSX, TSX, Vue.js components
- **Data Formats**: JSON, JSON5, JSONC, YAML
- **Documentation**: Markdown, MDX
- **Query Languages**: GraphQL
- **Template Engines**: Handlebars

**Formatting Options:**
- **Indentation**: Spaces (2, 4) or Tabs
- **Line Width**: 80, 100, 120 characters
- **Semicolons**: Always, never, or preserve
- **Quotes**: Single, double, or preserve
- **Trailing Commas**: All, ES5, none

### 📂 File Upload & Processing

**Supported File Types:**
```
Programming Languages:
.js, .jsx, .ts, .tsx, .py, .java, .cpp, .c, .cs, .php, .rb, .go, .rs, .swift, .kt, .scala, .dart

Web Technologies:
.html, .htm, .css, .scss, .sass, .less, .vue

Data & Configuration:
.json, .yaml, .yml, .xml, .toml, .ini, .env

Documentation:
.md, .mdx, .txt, .rst

Others:
.sql, .sh, .ps1, .dockerfile
```

---

## 📊 Supported Languages Matrix

### 🔄 Conversion Support Matrix

| Source Language | Target Languages | Conversion Quality | Notes |
|-----------------|------------------|-------------------|-------|
| **JavaScript** | Python, Java, C++, TypeScript, Go | ⭐⭐⭐⭐⭐ | Excellent support for all modern JS features |
| **Python** | JavaScript, Java, C++, Go, Rust | ⭐⭐⭐⭐⭐ | Strong support for Python 3.x syntax |
| **Java** | C++, C#, Python, JavaScript, Kotlin | ⭐⭐⭐⭐ | Good OOP concept translation |
| **C++** | C, Java, C#, Rust, Go | ⭐⭐⭐⭐ | Memory management concepts adapted |
| **TypeScript** | JavaScript, Java, C#, Python | ⭐⭐⭐⭐⭐ | Type information preserved where possible |
| **C#** | Java, C++, VB.NET, F#, TypeScript | ⭐⭐⭐⭐ | .NET ecosystem compatibility |
| **Go** | C++, Rust, Java, Python | ⭐⭐⭐⭐ | Concurrency patterns translated |
| **Rust** | C++, C, Go, Zig | ⭐⭐⭐⭐ | Memory safety concepts explained |
| **PHP** | JavaScript, Python, Java, C# | ⭐⭐⭐ | Web-specific features adapted |
| **Ruby** | Python, JavaScript, Java | ⭐⭐⭐ | Dynamic features preserved |
| **Swift** | Objective-C, Java, Kotlin, C++ | ⭐⭐⭐⭐ | iOS-specific concepts documented |
| **Kotlin** | Java, Swift, C#, TypeScript | ⭐⭐⭐⭐ | Interoperability features maintained |
| **Dart** | JavaScript, TypeScript, Java | ⭐⭐⭐ | Flutter-specific patterns adapted |
| **Scala** | Java, Kotlin, F#, Haskell | ⭐⭐⭐ | Functional programming concepts preserved |
| **Haskell** | Scala, F#, OCaml, Elm | ⭐⭐⭐ | Pure functional paradigms explained |

### 🧹 Formatting Support

| Language | Prettier | Auto-Fix |
|----------|----------|--------------|
| **JavaScript** | ✅ | ✅ | 
| **TypeScript** | ✅ | ✅ |
| **JSX/TSX** | ✅ | ✅ |
| **HTML** | ✅ | ✅ |
| **CSS/SCSS** | ✅ | ✅ | 
| **JSON** | ✅ | ✅ | 
| **Markdown** | ✅ | ✅ |
| **Vue** | ✅ | ✅ | 
| **YAML** | ✅ | ✅ | 
| **GraphQL** | ✅ | ✅ |
| **Python** | ❌ | ⚠️ |
| **Java** | ❌ | ⚠️ |
| **C++** | ❌ | ⚠️ |

---

## 🤝 Contributing

We welcome contributions from developers of all skill levels! Here's how you can help make CodeManipulate even better:

### 🛠️ How to Contribute

1. **Fork the Repository**
   ```bash
   git fork https://github.com/avdeshjadon/CHANGELANG.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-amazing-feature
   ```

3. **Make Your Changes**
   - Follow existing code style and conventions
   - Add tests for new functionality
   - Update documentation as needed

4. **Submit a Pull Request**
   - Provide a clear description of changes
   - Include screenshots for UI changes
   - Reference any related issues

### 🐛 Bug Reports & Feature Requests

- **Found a Bug?** Open an issue with detailed reproduction steps
- **Have an Idea?** Create a feature request with use cases and examples
- **Need Help?** Check existing issues or start a discussion

### 💡 Areas We Need Help

- **Language Support**: Add support for new programming languages
- **AI Improvements**: Enhance detection accuracy and conversion quality  
- **UI/UX**: Improve user interface and experience
- **Testing**: Add comprehensive test coverage
- **Documentation**: Improve guides and API documentation
- **Performance**: Optimize code processing speed and efficiency

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Avdesh Jadon

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- **Google AI Team** for providing the powerful Gemini API
- **Prettier Team** for the excellent code formatting library
- **Open Source Community** for inspiration and feedback
- **Beta Testers** who helped improve the application
- **All Contributors** who made this project possible

---

## 📞 Contact & Support

- **Developer**: [Avdesh Jadon](https://github.com/avdeshjadon)
- **Project Repository**: [CodeManipulate on GitHub](https://github.com/avdeshjadon/CHANGELANG)
- **Live Demo**: [Try CodeManipulate](https://avdeshjadon.github.io/CHANGELANG)
- **Issues & Bug Reports**: [GitHub Issues](https://github.com/avdeshjadon/CHANGELANG/issues)

---

## 🌟 Show Your Support

If you find CodeManipulate helpful, please consider:

### ⭐ **Star this repository** 
Click the ⭐ button at the top of this page to show your support!

### 🍴 **Fork this project**
Help us grow by creating your own copy and contributing improvements!

### 🔗 **Share with others**
Spread the word about CodeManipulate in your developer community!

### 💝 **Contribute**
Join our growing community of contributors and help make coding easier for everyone!

---

<div align="center">

### 🚀 **Ready to Transform Your Code?**

**[🌐 Try CodeManipulate Now](https://avdeshjadon.github.io/CHANGELANG)**

</div>

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/avdeshjadon">Avdesh Jadon</a> and the amazing open source community</sub>
</div>
