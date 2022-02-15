module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'false' or 'media'
  important: true,
  theme: {
    screens: {
      first: { max: "1320px" },
      laptop: { max: "1024px" },
      soltemp: { max: "958px" },
      tablet: { max: "836px" },
      tokentemp: { max: "604px" },
      mobile: { max: "426px" },
      mobilemedium: { max: "386px" },
      mobilefinal: { max: "350px" },
    },
    extend: {
      fontSize: {
        subtitle: [
          "32px",
          {
            lineHeight: "190%",
          },
        ],
        token: [
          "22px",
          {
            lineHeight: "190%",
          },
        ],
        normal: [
          "16px",
          {
            lineHeight: "25px",
          },
        ],
        normalcard: [
          "14px",
          {
            lineHeight: "20px",
          },
        ],
        normalmobile: [
          "12px",
          {
            lineHeight: "25px",
          },
        ],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#65128D",
          "primary-focus": "#64128D" /* Primary Light color - focused */,
          "primary-content":
            "#ffffff" /* Foreground content color to use on primary light color */,

          secondary: "#9932CC" /* Primary Light color */,
          "secondary-focus": "#9902CC" /* Primary Light color - focused */,
          "secondary-content":
            "#ffffff" /* Foreground content color to use on primary light color */,

          accent:
            "radial-gradient(100% 680.53% at 0% 44.38%, #9932CC 0%, rgba(153, 50, 204, 0.7) 100%);" /* Accent color */,
          "accent-focus": "#37cdbe" /* Accent color - focused */,
          "accent-content":
            "#ffffff" /* Foreground content color to use on accent color */,

          neutral: "#333333" /* Neutral color */,
          "neutral-focus": "#33333380" /* Neutral color - focused */,
          "neutral-content":
            "#333333" /* Foreground content color to use on neutral color */,

          info: "#3671E9" /* Info */,
          success: "#009485" /* Success */,
          warning: "#ff9900" /* Warning */,
          error: "#ff5724" /* Error */,
          gradient:
            "radial-gradient(180deg, #F9EDFF 39.12%, rgba(255, 255, 255, 0) 80.46%);",
        },
      },
    ],
  },
};
