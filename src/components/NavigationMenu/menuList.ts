import lang from "lang";

import { RolePermissionFlag } from "api/enums/RolePermissionFlag";

import type { INavigationMenu } from "./NavigationMenuDrawer";

const langPage = lang.components.navigationMenu;

const menuList: INavigationMenu[] = [
    { name: "home", title: langPage.home, icon: "home", link: "/" },
    { name: "profile", title: langPage.profile, icon: "profile", link: "/profile" },
    { name: "links", title: lang.pages.links.title, icon: "links", link: "/links" },
    { name: "maps", title: lang.components.map.title, icon: "map", link: "/maps" },
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
        icon: "claims",
        link: "/claims",
        roles: [["claims"]],
    },
    {
        name: "medicalPolicies",
        title: langPage.medicalPolicies,
        icon: "medicalPolicies",
        link: "/medicalPolicies",
        roles: [["medicalPolicies"]],
    },
    {
        name: "medicalInfo",
        title: lang.pages.medicalInfo.title,
        icon: "medicalInfo",
        link: "/medicalInfo",
        roles: [["medicalInfo"]],
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
        name: "company",
        title: lang.pages.companies.title,
        icon: "company",
        link: "/company",
        roles: [["company"]],
    },
    {
        name: "roles",
        title: langPage.roles,
        icon: "roles",
        link: "/roles",
        roles: [["admins"]],
    },
    {
        name: "users",
        title: langPage.users,
        icon: "users",
        link: "/users",
        roles: [["admins"]],
    },
    {
        name: "persons",
        title: langPage.persons,
        icon: "users",
        link: "/persons",
        roles: [["users"]],
    },
    {
        name: "shop",
        title: langPage.shop,
        icon: "shop",
        link: "/shop",
        roles: [["shop"]],
    },
    /*{
        name: "medicine",
        title: lang.pages.medicine.title,
        icon: "medicine",
        link: "/medicine",
        roles: [["medicineAdmin"]],
    },*/
    {
        name: "documentPrint",
        title: lang.pages.documentPrint.title,
        icon: "print",
        link: "/documentPrint",
        roles: [["admins"]],
    },
    {
        name: "licenses",
        title: lang.pages.licenses.title,
        icon: "licenses",
        link: "/licenses",
    },
];

export default menuList;
