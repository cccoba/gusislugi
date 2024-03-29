import lang from "lang";

import { INavigationMenu } from "./NavigationMenuDrawer";

const langPage = lang.components.navigationMenu;

const menuList: INavigationMenu[] = [
    { name: "home", title: langPage.home, icon: "home", link: "/" },
    { name: "profile", title: langPage.profile, icon: "person_pin", link: "/profile" },
    { name: "claims", title: langPage.claims, icon: "warning", link: "/claims", access: ["claims"] },
    { name: "users", title: langPage.users, icon: "group", link: "/users", access: ["users"] },
];

export default menuList;
