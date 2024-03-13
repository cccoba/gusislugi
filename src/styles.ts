import { createTheme } from "@mui/material/styles";
import { ruRU } from "@mui/material/locale";
import { red } from "@mui/material/colors";
// A custom theme for this app
const theme = createTheme(
    {
        palette: {
            primary: {
                main: "#517da2",
                light: "#5a8fbb",
                contrastText: "#ffffff",
            },
            grey: {
                "900": "#2D323E",
                "800": "#111111",
            },
            error: {
                main: red.A400,
            },
        },
        typography: {
            fontFamily: `"core", sans-serif`,
            h1: {
                fontSize: "2.5em",
            },
            h2: {
                fontSize: "24px",
            },
            h3: {
                fontSize: "1.75em",
            },
            h4: {
                fontSize: "1.5em",
            },
            h5: {
                fontSize: "1.25em",
            },
            h6: {
                fontSize: "1.1em",
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        "& .scrollable": {
                            "&:hover": {
                                overflow: "auto",
                            },
                            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                                backgroundColor: "transparent",
                                width: "10px",
                            },
                            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                                borderRadius: 8,
                                backgroundColor: "#6b6b6b",
                                border: "1px solid #2D323E",
                            },
                            "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
                                backgroundColor: "#959595",
                            },
                            "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
                                backgroundColor: "#959595",
                            },
                            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
                                backgroundColor: "#959595",
                            },
                            "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
                                backgroundColor: "#2D323E",
                            },
                        },
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: { color: "#000" },
                },
            },
            MuiTypography: {
                styleOverrides: {
                    root: { color: "#000" },
                },
            },
            MuiDialogContentText: {
                styleOverrides: {
                    root: { color: "#000" },
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    sizeSmall: {
                        padding: "6px",
                    },
                },
            },
        },
    },
    ruRU
);

export default theme;
