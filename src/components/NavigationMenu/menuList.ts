import lang from "lang";

import { RolePermissionFlag } from "api/enums/RolePermissionFlag";

import { INavigationMenu } from "./NavigationMenuDrawer";

const langPage = lang.components.navigationMenu;

const menuList: INavigationMenu[] = [
    { name: "home", title: langPage.home, icon: "home", link: "/" },
    { name: "profile", title: langPage.profile, icon: "person_pin", link: "/profile" },
    { name: "sgp", title: langPage.sgp, icon: "sgp", link: "/sgp" },
    {
        name: "qrScanner",
        title: langPage.qrScanner,
        icon: "qrScanner",
        link: "/qrScanner",
        roles: [["qr", RolePermissionFlag.View]],
    },
    {
        name: "claims",
        title: langPage.claims,
        icon: "warning",
        link: "/claims",
        roles: [["claims"]],
    },
    {
        name: "money",
        title: langPage.money,
        icon: "payments",
        link: "/money",
        roles: [["admins"]],
    },

    {
        name: "medicalPolicies",
        title: langPage.medicalPolicies,
        icon: "medicalPolicies",
        link: "/medicalPolicies",
        roles: [["medicalPolicies"]],
    },
    {
        name: "taxes",
        title: langPage.taxes,
        icon: "taxes",
        link: "/taxes",
        roles: [["taxes"]],
    },
    {
        name: "fines",
        title: langPage.fines,
        icon: "fines",
        link: "/fines",
        roles: [["fines"]],
    },
    {
        name: "wanteds",
        title: lang.pages.wanteds.title,
        icon: "wanteds",
        link: "/wanteds",
        roles: [["wanteds"]],
    },
    {
        name: "wanteds2",
        title: lang.pages.wanteds.title2,
        icon: "wanteds",
        link: "/wanteds2",
        roles: [["wanteds2"]],
    },
    {
        name: "roles",
        title: langPage.roles,
        icon: "engineering",
        link: "/roles",
        roles: [["admins"]],
    },
    {
        name: "users",
        title: langPage.users,
        icon: "group",
        link: "/users",
        roles: [["admins"]],
    },
    {
        name: "persons",
        title: langPage.persons,
        icon: "group",
        link: "/persons",
        roles: [["users"]],
    },
];

export default menuList;
