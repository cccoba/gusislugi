import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";

import theme from "styles";
import store from "store";

import Main from "./Main";

function App() {
    return (
        <Provider store={store}>
            <SnackbarProvider maxSnack={3}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Main />
                </ThemeProvider>
            </SnackbarProvider>
        </Provider>
    );
}

export default App;
