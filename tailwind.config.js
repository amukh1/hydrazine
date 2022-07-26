module.exports = {
  content: [
    "./{src,public,coverage}/*.{html,js,tsx,ts}",
    "./{src,public,coverage}/*/*.{html,js,tsx,ts}",
    "./{src,public,coverage}/*/*.{html,js,tsx,ts}",
    "./{src,public,coverage}/*/*/*.{html,js,tsx,ts}",
  ],
  theme: {
    extend: {
      colors: {
        tuna: {
          DEFAULT: "#333B45",
          50: "#4A5564",
          100: "#47525F",
          200: "#404A57",
          300: "#3A434E",
          400: "#333B45",
          500: "#2C333C",
          600: "#262C33",
          700: "#1F242B",
          800: "#191D22",
          900: "#121519",
        },
        metal: {
          DEFAULT: "#191A19",
          50: "#3B3D3B",
          100: "#373937",
          200: "#303130",
          300: "#282A28",
          400: "#212221",
          500: "#191A19",
          600: "#121212",
          700: "#0A0A0A",
          800: "#030303",
          900: "#000000",
        },
        currant: {
          DEFAULT: "#352F44",
          50: "#554B6D",
          100: "#514868",
          200: "#4A425F",
          300: "#433C56",
          400: "#3C354D",
          500: "#352F44",
          600: "#2E293B",
          700: "#272232",
          800: "#201C29",
          900: "#191620",
        },
        miska: {
          DEFAULT: "#DBD8E3",
          50: "#FFFFFF",
          100: "#FCFCFD",
          200: "#F4F3F6",
          300: "#EBEAF0",
          400: "#E3E1E9",
          500: "#DBD8E3",
          600: "#D3CFDD",
          700: "#CBC6D6",
          800: "#C2BDD0",
          900: "#BAB4C9",
        },
        stile: {
          DEFAULT: "#2A2438",
          50: "#493F62",
          100: "#463C5D",
          200: "#3F3654",
          300: "#38304B",
          400: "#312A41",
          500: "#2A2438",
          600: "#231E2F",
          700: "#1C1825",
          800: "#15121C",
          900: "#0E0C13",
        },
        spruce: {
          DEFAULT: "#3A4750",
          50: "#576A78",
          100: "#546673",
          200: "#4D5F6B",
          300: "#475762",
          400: "#404F59",
          500: "#3A4750",
          600: "#343F47",
          700: "#2D373E",
          800: "#272F35",
          900: "#20282D",
        },
        space: {
          DEFAULT: "#32373C",
          50: "#515962",
          100: "#4E565D",
          200: "#474E55",
          300: "#40464D",
          400: "#393F44",
          500: "#32373C",
          600: "#2B2F34",
          700: "#24282B",
          800: "#1D2023",
          900: "#16181B",
        },
        foam: {
          DEFAULT: "#F2F9FE",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#FFFFFF",
          400: "#FFFFFF",
          500: "#F2F9FE",
          600: "#E4F2FD",
          700: "#D6ECFC",
          800: "#C7E5FB",
          900: "#B9DFFA",
        },
        scorpion: {
          DEFAULT: "#5B5B5B",
          50: "#7D7D7D",
          100: "#7A7A7A",
          200: "#727272",
          300: "#6A6A6A",
          400: "#636363",
          500: "#5B5B5B",
          600: "#535353",
          700: "#4C4C4C",
          800: "#444444",
          900: "#3C3C3C",
        },

        picton: {
          DEFAULT: "#4598E4",
          50: "#81B9ED",
          100: "#7AB6EC",
          200: "#6DAEEA",
          300: "#60A7E8",
          400: "#529FE6",
          500: "#4598E4",
          600: "#3891E2",
          700: "#2A89E0",
          800: "#2082DB",
          900: "#1E7ACE",
        },
        steel: {
          DEFAULT: "#2A2438",
          50: "#493F62",
          100: "#463C5D",
          200: "#3F3654",
          300: "#38304B",
          400: "#312A41",
          500: "#2A2438",
          600: "#231E2F",
          700: "#1C1825",
          800: "#15121C",
          900: "#0E0C13",
        },
        cinna: {
          DEFAULT: "#E34949",
          50: "#EC8585",
          100: "#EB7E7E",
          200: "#E97171",
          300: "#E76464",
          400: "#E55656",
          500: "#E34949",
          600: "#E13C3C",
          700: "#DF2E2E",
          800: "#DC2222",
          900: "#CF2020",
        },
        royal: {
          DEFAULT: "#FE8C52",
          50: "#FEBA96",
          100: "#FEB48F",
          200: "#FEAA80",
          300: "#FEA070",
          400: "#FE9661",
          500: "#FE8C52",
          600: "#FE8243",
          700: "#FE7834",
          800: "#FE6E24",
          900: "#FE6415",
        },
        brew: {
          DEFAULT: "#347AEB",
          50: "#73A3F1",
          100: "#6C9FF0",
          200: "#5E95EF",
          300: "#508CEE",
          400: "#4283EC",
          500: "#347AEB",
          600: "#2671EA",
          700: "#1868E8",
          800: "#1661DB",
          900: "#145BCE",
        },
        indigo: {
          DEFAULT: "#4A58D4",
          50: "#828BE1",
          100: "#7B86E0",
          200: "#6F7ADD",
          300: "#636FDA",
          400: "#5663D7",
          500: "#4A58D4",
          600: "#3E4DD1",
          700: "#3141CE",
          800: "#2E3DC2",
          900: "#2B39B6",
        },
        bray: {
          DEFAULT: "#191926",
          50: "#343450",
          100: "#31314B",
          200: "#2B2B42",
          300: "#252538",
          400: "#1F1F2F",
          500: "#191926",
          600: "#13131D",
          700: "#0D0D14",
          800: "#07070A",
          900: "#010101",
        },
        gore: {
          DEFAULT: "#171736",
          50: "#2C2C66",
          100: "#292961",
          200: "#252556",
          300: "#20204B",
          400: "#1C1C41",
          500: "#171736",
          600: "#12122B",
          700: "#0E0E21",
          800: "#090916",
          900: "#05050B",
        },
        shark: {
          DEFAULT: "#2A2E31",
          50: "#4A5156",
          100: "#464D52",
          200: "#3F454A",
          300: "#383D41",
          400: "#313639",
          500: "#2A2E31",
          600: "#232629",
          700: "#1C1F21",
          800: "#151718",
          900: "#0E0F10",
        },
        gold: {
          DEFAULT: "#D4C64A",
          50: "#E1D882",
          100: "#E0D67B",
          200: "#DDD26F",
          300: "#DACE63",
          400: "#D7CA56",
          500: "#D4C64A",
          600: "#D1C23E",
          700: "#CEBE31",
          800: "#C2B32E",
          900: "#B6A82B",
        },
        amethyst: {
          DEFAULT: "#A14AD4",
          50: "#BE82E1",
          100: "#BB7BE0",
          200: "#B46FDD",
          300: "#AE63DA",
          400: "#A756D7",
          500: "#A14AD4",
          600: "#9B3ED1",
          700: "#9431CE",
          800: "#8B2EC2",
          900: "#822BB6",
        },
        emerald: {
          DEFAULT: "#4AD45A",
          50: "#82E18D",
          100: "#7BE087",
          200: "#6FDD7C",
          300: "#63DA71",
          400: "#56D765",
          500: "#4AD45A",
          600: "#3ED14F",
          700: "#31CE43",
          800: "#2EC23F",
          900: "#2BB63B",
        },
        valencia: {
          DEFAULT: "#D44A4A",
          50: "#E18282",
          100: "#E07B7B",
          200: "#DD6F6F",
          300: "#DA6363",
          400: "#D75656",
          500: "#D44A4A",
          600: "#D13E3E",
          700: "#CE3131",
          800: "#C22E2E",
          900: "#B62B2B",
        },
        perfume: {
          DEFAULT: "#BD93F9",
          50: "#E5D4FD",
          100: "#E0CDFC",
          200: "#D8BEFB",
          300: "#CFB0FB",
          400: "#C6A1FA",
          500: "#BD93F9",
          600: "#B485F8",
          700: "#AB76F7",
          800: "#A268F7",
          900: "#9A59F6",
        },
        reddy: {
          DEFAULT: "#FF5555",
          50: "#FF9A9A",
          100: "#FF9292",
          200: "#FF8383",
          300: "#FF7474",
          400: "#FF6464",
          500: "#FF5555",
          600: "#FF4646",
          700: "#FF3636",
          800: "#FF2727",
          900: "#FF1818",
        },
        dark: {
          DEFAULT: "#282A36",
          50: "#45495E",
          100: "#424559",
          200: "#3C3F50",
          300: "#353848",
          400: "#2F313F",
          500: "#282A36",
          600: "#21232D",
          700: "#1B1C24",
          800: "#14151C",
          900: "#0E0F13",
        },
        bray: {
          DEFAULT: "#44475A",
          50: "#626681",
          100: "#5E637D",
          200: "#585C74",
          300: "#51556B",
          400: "#4B4E63",
          500: "#44475A",
          600: "#3D4051",
          700: "#373949",
          800: "#303240",
          900: "#2A2B37",
        },
        shamrock: {
          DEFAULT: "#32C27A",
          50: "#62D79C",
          100: "#5CD599",
          200: "#50D291",
          300: "#44CF89",
          400: "#38CC82",
          500: "#32C27A",
          600: "#2FB672",
          700: "#2CAA6B",
          800: "#299E63",
          900: "#25915B",
        },
        dodger: {
          DEFAULT: "#3D81F5",
          50: "#7E9FF8",
          100: "#779BF8",
          200: "#6993F7",
          300: "#5A8DF7",
          400: "#4C86F6",
          500: "#3D81F5",
          600: "#2E7CF4",
          700: "#2078F4",
          800: "#1174F3",
          900: "#0C72E9",
        },
      },
    },
  },
  plugins: [],
};
