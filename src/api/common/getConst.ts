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
        | "images-url"
        | "dock-url"
        | "document-print-generator-url"
): any => {
    switch (name) {
        case "auth-token-name":
            return process.env.REACT_APP_COOKIE_NAME;
        case "menu-width":
            return 280;
        case "api-url":
            return process.env.REACT_APP_API_URL;
        case "images-url":
            return process.env.REACT_APP_FILES_URL;
        case "dock-url":
            return process.env.REACT_APP_DOCFILES_URL;
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
        case "document-print-generator-url":
            return process.env.REACT_APP_DOCUMET_GENERATOR_URL;
    }
};
export default getConst;
