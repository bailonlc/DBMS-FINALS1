# D_MANDEM Mechanical Keyboards Shop

This project is a static web application that dynamically loads product data from a JSON file using JavaScript's `fetch()` API.

## ⚠️ Important: Running the Project

If you simply double-click `index.html` to open it in your web browser (you'll see `file:///...` in the URL bar), the products **will not load**. 

### How to Run (Using VS Code)

The easiest way to run this project is by using the **Live Server** extension in Visual Studio Code:
1. Open this project folder in Visual Studio Code.
2. Go to the Extensions panel (`Ctrl+Shift+X` or `Cmd+Shift+X`).
3. Search for and install the **Live Server** extension by Ritwick Dey.
4. Once installed, open `index.html`.
5. Click the **"Go Live"** button in the bottom right corner of your VS Code status bar (or right-click anywhere in the HTML file and select "Open with Live Server").
6. Your browser will automatically open the project at `http://127.0.0.1:5500`, and the products will load successfully!

### Alternative Ways to Run

If you have Node.js or Python installed, you can also spin up a quick local server via your terminal:

**Using Node.js (npx):**
```bash
npx serve .
```

**Using Python:**
```bash
python -m http.server
```
*(Then, open your browser and navigate to `http://localhost:8000`)*
