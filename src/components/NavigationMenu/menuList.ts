import lang from "lang";

import { RolePermissionFlag } from "api/enums/RolePermissionFlag";

import { INavigationMenu } from "./NavigationMenuDrawer";

const langPage = lang.components.navigationMenu;

const menuList: INavigationMenu[] = [
    { name: "home", title: langPage.home, icon: "home", link: "/" },
    { name: "profile", title: langPage.profile, icon: "person_pin", link: "/profile" },
    {
        name: "qrScanner",
        title: langPage.qrScanner,
        icon: "qr_code_scanner",
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
        name: "roles",
        title: langPage.roles,
        icon: "engineering",
        link: "/roles",
        roles: [["admins"]],
    },
    {
        name: "citizenships",
        title: langPage.citizenships,
        icon: "list",
        link: "/citizenships",
        roles: [["admins"]],
    },
    {
        name: "nationalities",
        title: langPage.nationalities,
        icon: "list",
        link: "/nationalities",
        roles: [["admins"]],
    },
    {
        name: "medicalPolicies",
        title: langPage.medicalPolicies,
        icon: "medical_services",
        link: "/medicalPolicies",
        roles: [["medicalPolicies"]],
    },
    {
        name: "users",
        title: langPage.users,
        icon: "group",
        link: "/users",
        roles: [["admins"]],
    },
];

export default menuList;
