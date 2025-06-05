import lang from "lang";

import type { INavigationMenu } from "./NavigationMenuDrawer";

const langPage = lang.components.navigationMenu;

const menuList: INavigationMenu[] = [
    { name: "home", title: langPage.home, icon: "home", link: "/", category: "main" },
    { name: "profile", title: langPage.profile, icon: "profile", link: "/profile", category: "main" },
    {
        name: "qrScanner",
        title: langPage.qrScanner,
        icon: "qrScanner",
        link: "/qrScanner",
        roles: [["qr"]],
        category: "main",
    },
    { name: "links", title: lang.pages.links.title, icon: "links", link: "/links", category: "main" },
    { name: "maps", title: lang.components.map.title, icon: "map", link: "/maps", category: "main" },

    {
        name: "medicalPolicies",
        title: langPage.medicalPolicies,
        icon: "medicalPolicies",
        link: "/medicalPolicies",
        roles: [["medicalPolicies"]],
        category: "medical",
    },
    {
        name: "medicalSickness",
        title: lang.pages.medicalSickness.title,
        icon: "medicine",
        link: "/medicalSickness",
        roles: [["medicalSickness"]],
        category: "medical",
    },
    {
        name: "medicalInfo",
        title: lang.pages.medicalInfo.title,
        icon: "medicalInfo",
        link: "/medicalInfo",
        roles: [["medicalInfo"]],
        category: "medical",
    },
    {
        name: "taxes",
        title: langPage.taxes,
        icon: "taxes",
        link: "/taxes",
        roles: [["taxes"]],
        category: "police",
    },
    {
        name: "fines",
        title: langPage.fines,
        icon: "fines",
        link: "/fines",
        roles: [["fines"]],
        category: "police",
    },
    {
        name: "wanteds",
        title: lang.pages.wanteds.title,
        icon: "wanteds",
        link: "/wanteds",
        roles: [["wanteds"]],
        category: "police",
    },
    {
        name: "company",
        title: lang.pages.companies.title,
        icon: "company",
        link: "/company",
        roles: [["company"]],
        category: "administrative",
    },
    {
        name: "claims",
        title: langPage.claims,
        icon: "claims",
        link: "/claims",
        roles: [["claims"]],
        category: "administrative",
    },
    {
        name: "roles",
        title: langPage.roles,
        icon: "roles",
        link: "/roles",
        roles: [["admins"]],
        category: "admin",
    },
    {
        name: "users",
        title: langPage.users,
        icon: "users",
        link: "/users",
        roles: [["admins"]],
        category: "admin",
    },
    {
        name: "persons",
        title: langPage.persons,
        icon: "users",
        link: "/persons",
        roles: [["users"]],
        category: "polices",
    },
    {
        name: "shop",
        title: langPage.shop,
        icon: "shop",
        link: "/shop",
        roles: [["shop"]],
        category: "admin",
    },

    {
        name: "documentPrint",
        title: lang.pages.documentPrint.title,
        icon: "print",
        link: "/documentPrint",
        roles: [["admins"]],
        category: "admin",
    },
    {
        name: "licenses",
        title: lang.pages.licenses.title,
        icon: "licenses",
        link: "/licenses",
        roles: [["licenses"]],
        category: "police",
    },
];

export default menuList;
