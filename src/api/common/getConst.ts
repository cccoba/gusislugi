const getConst = (
    name:
        | "auth-token-name"
        | "api-url"
        | "menu-width"
        | "app-version"
        | "lang"
        | "assets-images-path"
        | "bot-name"
        | "env-mode"
): any => {
    switch (name) {
        case "auth-token-name":
            return process.env.REACT_APP_COOKIE_NAME;
        case "menu-width":
            return 280;
        case "api-url":
            return process.env.REACT_APP_API_URL;
        case "app-version":
            return process.env.REACT_APP_VERSION;
        case "lang":
            return process.env.REACT_APP_LANG;
        case "assets-images-path":
            return "./assets/images/";
        case "bot-name":
            return process.env.REACT_APP_BOT_NAME;
        case "env-mode":
            return process.env.REACT_APP_ENVIRONMENT;
    }
};
export default getConst;
