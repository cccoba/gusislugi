const getConst = (
    name: "auth-token-name" | "api-url" | "menu-width" | "app-version" | "lang" | "assets-images-path"
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
    }
};
export default getConst;
