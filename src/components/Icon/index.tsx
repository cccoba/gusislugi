import { SvgIconProps } from "@mui/material/SvgIcon";
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
    Gavel,
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
} from "@mui/icons-material";

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
    | "list";
type TIconNameAdditional =
    | "settings"
    | "taxes"
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
    | "shop";
export type TIconName = TIconNameBase | TIconNameAdditional;

interface IProps extends SvgIconProps {
    name: TIconName;
}

export default function Icon({ name, color = "inherit", ...props }: IProps) {
    const totalProps = { ...props, color };
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
        case "fines":
            return <Savings {...totalProps} />;
        case "wanteds":
            return <LocalPolice {...totalProps} />;
        case "wanteds2":
            return <Gavel {...totalProps} />;
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
        case "claims":
            return <Warning {...totalProps} />;
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
        default:
            return <QuestionMark {...totalProps} />;
    }
}
