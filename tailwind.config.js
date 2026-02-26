module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f5f5f5",
        ink: "#1a1a1a",
        smoke: "#4f4f4f",
        charcoal: "#2f2f2f",
        paper: "#ffffff"
      },
      fontFamily: {
        body: ['"Courier New"', "Courier", "monospace"],
        heading: ['"Courier New"', "Courier", "monospace"]
      },
      boxShadow: {
        outline: "6px 6px 0 rgba(79, 79, 79, 0.45)"
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
