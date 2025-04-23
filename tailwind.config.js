const { pastel } = require("daisyui/src/colors/themes")

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {}
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mycustom: {
          
          "base-100": "#f7f8fa", // slightly off-white
          "base-200": "#e7e9ef", // deeper contrast for boxes
          "primary": "#7d9acc",  // richer pastel blue
          "secondary": "#fbbf24", // amber tweak
          "accent": "#f472b6", // deeper pink
          "neutral": "#3d4451",
          "info": "#60a5fa",
          "success": "#34d399",
          "warning": "#facc15",
          "error": "#f87171"
        }
      },
      "dark"
    ]
  }
}
