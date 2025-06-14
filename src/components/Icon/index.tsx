import type { SvgIconProps } from "@mui/material/SvgIcon";
import {
    Edit,
    Refresh,
    Send,
    Search,
    Download,
    Add,
    Remove,
    Delete,
    ArrowBack,
    KeyboardArrowDown,
    KeyboardArrowUp,
    Done,
    Person,
    Close,
    Visibility,
    VisibilityOff,
    PersonAdd,
    People,
    AddBox,
    IndeterminateCheckBox,
    Home,
    CropLandscape,
    CropPortrait,
    CropSquare,
    Crop,
    Menu,
    Save,
    MoreVert,
    FilterAlt,
    Autorenew,
    RotateLeft,
    RotateRight,
    List,
    Settings,
    ReceiptLong,
    Savings,
    LocalPolice,
    CurrencyExchange,
    QrCodeScanner,
    NoPhotography,
    MedicalServices,
    Vaccines,
    VpnKey,
    Forum,
    Payments,
    Warning,
    Feed,
    PersonPin,
    Badge,
    Engineering,
    QuestionMark,
    ShoppingCart,
    DeviceThermostat,
    TireRepair,
    Biotech,
    LocalPharmacy,
    CalendarToday,
    History,
    Store,
    Print,
    ContentPaste,
    Public,
    GppGood,
    Security,
    KeyboardArrowRight,
    FactCheck,
    Category,
    Gavel,
    PersonSearch,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";

//export type TIconName = keyof typeof iconsPath;

type TIconNameBase =
    | "edit"
    | "refresh"
    | "send"
    | "search"
    | "download"
    | "add"
    | "minus"
    | "delete"
    | "back"
    | "down"
    | "up"
    | "ok"
    | "user"
    | "close"
    | "show"
    | "hide"
    | "userAdd"
    | "users"
    | "addBox"
    | "minusBox"
    | "home"
    | "crop_landscape"
    | "crop_portrait"
    | "crop_square"
    | "crop"
    | "menu"
    | "save"
    | "more"
    | "filter"
    | "reset"
    | "rotate_left"
    | "rotate_right"
    | "list"
    | "secrets";
type TIconNameAdditional =
    | "settings"
    | "taxes"
    | "taxesTypes"
    | "fines"
    | "wanteds"
    | "wanteds2"
    | "sgp"
    | "qrScanner"
    | "noCamera"
    | "medicalPolicies"
    | "medicalInfo"
    | "id"
    | "messages"
    | "money"
    | "claims"
    | "links"
    | "profile"
    | "badge"
    | "roles"
    | "shop"
    | "medicine"
    | "temperature"
    | "tire_repair"
    | "labs"
    | "local_pharmacy"
    | "dateTime"
    | "history"
    | "company"
    | "print"
    | "paste"
    | "map"
    | "licenses"
    | "weapons"
    | "right"
    | "secrets"
    | "wanteds3";
export type TIconName = TIconNameBase | TIconNameAdditional;
export const IconList: TIconName[] = [
    "edit",
    "refresh",
    "send",
    "search",
    "download",
    "add",
    "minus",
    "delete",
    "back",
    "down",
    "up",
    "ok",
    "user",
    "close",
    "show",
    "hide",
    "userAdd",
    "users",
    "home",
    "menu",
    "save",
    "more",
    "filter",
    "list",
    "settings",
    "taxes",
    "taxesTypes",
    "fines",
    "wanteds",
    "wanteds2",
    "wanteds3",
    "sgp",
    "qrScanner",
    "noCamera",
    "medicalPolicies",
    "medicalInfo",
    "id",
    "messages",
    "money",
    "claims",
    "links",
    "profile",
    "badge",
    "roles",
    "shop",
    "medicine",
    "temperature",
    "tire_repair",
    "labs",
    "local_pharmacy",
    "dateTime",
    "history",
    "company",
    "print",
    "paste",
    "map",
    "licenses",
    "weapons",
    "right",
];

export interface IIconProps extends SvgIconProps {
    name: TIconName;
    tooltip?: string;
}

export default function Icon({ tooltip, name, color = "inherit", ...props }: IIconProps) {
    const totalProps = { ...props, color };
    totalProps.className = `iconName-${name}`;
    if (tooltip) {
        return (
            <Tooltip title={tooltip}>
                <span>
                    <Icon
                        name={name}
                        {...totalProps}
                    />
                </span>
            </Tooltip>
        );
    }

    switch (name) {
        case "edit":
            return <Edit {...totalProps} />;
        case "refresh":
            return <Refresh {...totalProps} />;
        case "send":
            return <Send {...totalProps} />;
        case "search":
            return <Search {...totalProps} />;
        case "download":
            return <Download {...totalProps} />;
        case "add":
            return <Add {...totalProps} />;
        case "minus":
            return <Remove {...totalProps} />;
        case "delete":
            return <Delete {...totalProps} />;
        case "back":
            return <ArrowBack {...totalProps} />;
        case "down":
            return <KeyboardArrowDown {...totalProps} />;
        case "up":
            return <KeyboardArrowUp {...totalProps} />;
        case "right":
            return <KeyboardArrowRight {...totalProps} />;
        case "ok":
            return <Done {...totalProps} />;
        case "user":
            return <Person {...totalProps} />;
        case "close":
            return <Close {...totalProps} />;
        case "show":
            return <Visibility {...totalProps} />;
        case "hide":
            return <VisibilityOff {...totalProps} />;
        case "userAdd":
            return <PersonAdd {...totalProps} />;
        case "users":
            return <People {...totalProps} />;
        case "addBox":
            return <AddBox {...totalProps} />;
        case "minusBox":
            return <IndeterminateCheckBox {...totalProps} />;
        case "home":
            return <Home {...totalProps} />;
        case "crop_landscape":
            return <CropLandscape {...totalProps} />;
        case "crop_portrait":
            return <CropPortrait {...totalProps} />;
        case "crop_square":
            return <CropSquare {...totalProps} />;
        case "crop":
            return <Crop {...totalProps} />;
        case "menu":
            return <Menu {...totalProps} />;
        case "save":
            return <Save {...totalProps} />;
        case "more":
            return <MoreVert {...totalProps} />;
        case "filter":
            return <FilterAlt {...totalProps} />;
        case "reset":
            return <Autorenew {...totalProps} />;
        case "rotate_left":
            return <RotateLeft {...totalProps} />;
        case "rotate_right":
            return <RotateRight {...totalProps} />;
        case "list":
            return <List {...totalProps} />;
        case "settings":
            return <Settings {...totalProps} />;
        case "taxes":
            return <ReceiptLong {...totalProps} />;
        case "taxesTypes":
            return <Category {...totalProps} />;
        case "fines":
            return <Savings {...totalProps} />;
        case "wanteds":
            return <LocalPolice {...totalProps} />;
        case "wanteds2":
            return <Gavel {...totalProps} />;
        case "wanteds3":
            return <PersonSearch {...totalProps} />;
        case "sgp":
            return <CurrencyExchange {...totalProps} />;
        case "qrScanner":
            return <QrCodeScanner {...totalProps} />;
        case "noCamera":
            return <NoPhotography {...totalProps} />;
        case "medicalPolicies":
            return <MedicalServices {...totalProps} />;
        case "medicalInfo":
            return <Vaccines {...totalProps} />;
        case "id":
            return <VpnKey {...totalProps} />;
        case "messages":
            return <Forum {...totalProps} />;
        case "money":
            return <Payments {...totalProps} />;
        case "secrets":
            return <Warning {...totalProps} />;
        case "claims":
            return <FactCheck {...totalProps} />;
        case "links":
            return <Feed {...totalProps} />;
        case "profile":
            return <PersonPin {...totalProps} />;
        case "badge":
            return <Badge {...totalProps} />;
        case "roles":
            return <Engineering {...totalProps} />;
        case "shop":
            return <ShoppingCart {...totalProps} />;
        case "medicine":
            return <MedicalServices {...totalProps} />;
        case "temperature":
            return <DeviceThermostat {...totalProps} />;
        case "tire_repair":
            return <TireRepair {...totalProps} />;
        case "labs":
            return <Biotech {...totalProps} />;
        case "local_pharmacy":
            return <LocalPharmacy {...totalProps} />;
        case "dateTime":
            return <CalendarToday {...totalProps} />;
        case "history":
            return <History {...totalProps} />;
        case "company":
            return <Store {...totalProps} />;
        case "print":
            return <Print {...totalProps} />;
        case "paste":
            return <ContentPaste {...totalProps} />;
        case "map":
            return <Public {...totalProps} />;
        case "licenses":
            return <GppGood {...totalProps} />;
        case "weapons":
            return <Security {...totalProps} />;
        default:
            return <QuestionMark {...totalProps} />;
    }
}
