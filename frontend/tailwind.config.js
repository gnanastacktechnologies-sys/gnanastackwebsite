/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gnana: {
          bg: "#05070A",
          dark: "#0A0F14",
          surface: "#0E141D",
          border: "rgba(255, 255, 255, 0.08)",
          blue: "#0066FF",
          cyan: "#00C8FF",
          teal: "#00D6B4",
          green: "#39E75F",
          lime: "#A8FF12",
          text: "#F5F7FA",
          muted: "#8B95A7",
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      },
      backgroundImage: {
        'gradient-blue-cyan': 'linear-gradient(135deg, #0066FF 0%, #00C8FF 100%)',
        'gradient-cyan-teal': 'linear-gradient(135deg, #00C8FF 0%, #00D6B4 100%)',
        'gradient-teal-green': 'linear-gradient(135deg, #00D6B4 0%, #39E75F 100%)',
        'gradient-blue-green': 'linear-gradient(135deg, #0066FF 0%, #39E75F 100%)',
        'hero-radial': 'radial-gradient(circle at 50% 30%, rgba(0, 200, 255, 0.12) 0%, rgba(5, 7, 10, 0) 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 10px rgba(0, 200, 255, 0.2))' },
          '100%': { filter: 'drop-shadow(0 0 25px rgba(0, 214, 180, 0.5))' },
        }
      }
    },
  },
  plugins: [],
}
