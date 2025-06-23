import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  corePlugins: {
    preflight: false, // Tắt các CSS mặc định
  },
  theme: {
    extend: {
      fontFamily: {
        'gothic': ['var(--font-gothic-a1)', 'sans-serif'],
        'sans': ['var(--font-gothic-a1)', 'Switzer', 'MiSans', '"Microsoft YaHei"', 'sans-serif'],
        'tektur': ['var(--font-tektur)', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0086D4',
          light: '#51BFFF',
          "100": '#15DFFD',
        },
        neutral: {
          DEFAULT: '#FCFCFC',
          white: '#FFFFFF',
        },
        dark: {
          DEFAULT: '#09041B',
          '100': '#191A1A',
          '200': '#0F0F0F',
        },
        green: {
          DEFAULT: '#076225',
          light: '#00FF22',
          '100': '#1AFF0D',
        },
        overlay: {
          DEFAULT: 'rgba(0, 0, 0, 0.18)', // #0000002E 18%
        },
        purple: {
          DEFAULT: '#5558FF',
          secondary: '#8833EE',
        },
        cyan: {
          DEFAULT: '#00C0FF',
        },
        violet: {
          DEFAULT: '#712AFF',
        },
        blue: {
          DEFAULT: '#00B8F4',
          '100': '#028FBE',
          '200': '#030620',
        },
        navy: {
          DEFAULT: '#112D60',
        },
        gray: {
          DEFAULT: '#D7D7D74D',
          '100': '#A9A9A9',
          '200': '#b2b0b0',
        },
        'purple-solid': 'rgba(85, 88, 255, 1)',
        'cyan-solid': 'rgba(0, 192, 255, 1)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-purple-cyan": "linear-gradient(270deg, #5558FF 0%, #00C0FF 100%)",
        "gradient-violet-blue": "linear-gradient(90deg, #712AFF 0%, #00B8F4 100%)",
        "gradient-purple-cyan-0deg": "linear-gradient(0deg, rgba(85, 88, 255, 0.40) 0%, rgba(0, 192, 255, 0.40) 100%)",
        "gradient-purple-cyan-solid": "linear-gradient(0deg, rgba(85, 88, 255, 1) 0%, rgba(0, 192, 255, 1) 100%)",
        "gradient-purple-cyan-60": "linear-gradient(0deg, rgba(85, 88, 255, 0.60) 0%, rgba(0, 192, 255, 0.60) 100%)",
        "gradient-navy-purple": "linear-gradient(93deg, rgba(17, 45, 96, 0.70) 2.14%, rgba(136, 51, 238, 0.70) 98.03%)",
      },
    },
  },
  plugins: [
    function({ addUtilities }: any) {
      addUtilities({
        '.bg-clip-text': {
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
      });
    },
  ],
};
export default config;
