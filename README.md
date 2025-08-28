<img width="1165" height="711" alt="Screenshot 2025-08-28 221815" src="https://github.com/user-attachments/assets/a3a8b9aa-0cfe-432e-8803-4575e90ae00a" /># Floating Todo App

A beautiful, always-on-top todo application with a modern red-orange theme. Built with Electron for a native desktop experience.

![Floating Todo App Preview](<img width="1165" height="711" alt="Screenshot 2025-08-28 221815" src="https://github.com/user-attachments/assets/16ddedcd-fa11-4bc8-a11f-5eb33cd8c4fc" />)s


## Features

- 🎨 Stylish red-orange theme with smooth animations
- 📝 Add, complete, and delete tasks
- 🔄 Always stays on top of other windows
- 🖱️ Draggable window with custom title bar
- 💾 Automatically saves your todos
- 🎯 Clean and minimal interface
- 🌓 Custom scrollbars and hover effects

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or later)
- npm (comes with Node.js)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/floating-todo-app.git
   cd floating-todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the app**
   ```bash
   npm start
   ```

## Usage

- **Add a task**: Type in the input field and press Enter or click the + button
- **Complete a task**: Click the checkbox next to the task
- **Delete a task**: Click the trash can icon
- **Move the window**: Click and drag the title bar
- **Minimize/Close**: Use the window controls in the top-right corner

## Customization

You can customize the app by modifying the `styles.css` file:

- Change the background color: Modify the `background` property in `.app-container`
- Adjust transparency: Change the alpha value in the `rgba()` color
- Update fonts: Modify the `font-family` in the `*` selector

## Building for Production

To create a distributable version of the app:

```bash
# Install electron-packager if you haven't already
npm install -g electron-packager

# Package for Windows
npx electron-packager . --platform=win32 --arch=x64 --out=dist --overwrite

# The executable will be in the dist/floating-todo-win32-x64/ folder
```

## Keyboard Shortcuts

- `Enter`: Add a new task
- `Delete`: Remove the selected task (when focused)
- `Esc`: Clear the input field

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Your Name]
