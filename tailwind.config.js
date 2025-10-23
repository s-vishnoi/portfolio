module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f5f5f5",
        ink: "#1a1a1a",
        smoke: "#666666",
        charcoal: "#444444",
        paper: "#ffffff"
      },
      fontFamily: {
        body: ['"Courier New"', "Courier", "monospace"],
        heading: ['"Courier New"', "Courier", "monospace"]
      },
      boxShadow: {
        outline: "8px 8px 0 rgba(26, 26, 26, 1)"
      },
      borderWidth: {
        3: "3px",
        4: "4px"
      }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        portfolio: {
          primary: "#1a1a1a",
          "primary-content": "#f5f5f5",
          secondary: "#444444",
          accent: "#1a1a1a",
          neutral: "#1a1a1a",
          "base-100": "#f5f5f5",
          "base-200": "#ffffff",
          "base-300": "#e3e3e3",
          info: "#1a1a1a",
          success: "#2f855a",
          warning: "#b7791f",
          error: "#c53030"
        }
      },
      "dark"
    ],
    darkTheme: "dark"
  }
}
