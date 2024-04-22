import CounterAdapter, { IFormFieldCounter } from "./Adapters/Counter";
import DateAdapter, { IFormFieldDate } from "./Adapters/Date";
import DateTimeAdapter, { IFormFieldDateTime } from "./Adapters/DateTime";
import ImageAdapter, { IFormFieldImage } from "./Adapters/Image";
import NumberAdapter, { IFormFieldNumber } from "./Adapters/Number";
import PasswordAdapter, { IFormFieldPassword } from "./Adapters/Password";
import RolePermissionsAdapter, { IFormFieldRolePermissions } from "./Adapters/RolePermissions";
import SelectAdapter, { IFormFieldSelect } from "./Adapters/Select";
import SelectFilteredAdapter, { IFormFieldSelectFiltered } from "./Adapters/SelectFiltered";
import SwitcherAdapter, { IFormFieldSwitcher } from "./Adapters/Switcher";
import TextAdapter, { IFormFieldText } from "./Adapters/Text";
import UserAdapter, { IFormFieldUser } from "./Adapters/User";

export interface IFormField {
    name: string;
    title: string;
    type: string;
    required?: boolean;
    pattern?: any;
    fieldProps?: any;
    fullWidth?: boolean;
    disabled?: boolean;
    variant?: "filled" | "outlined" | "standard";
    group?: string;
    hidden?: boolean;
    onChange?: (value: any) => void;
    validateFn?: (value: any) => string | true;
}
export interface IFormAdapterInputProps {
    value: any;
    fieldProps: any;
    fieldParams: any;
    required?: boolean;
    fullWidth?: boolean;
    disabled?: boolean;
    label?: string;
    variant?: "filled" | "outlined" | "standard";
    error: boolean;
    helperText?: string;
    onChangeValue: (value: any) => void;
}
export interface IFormAdapter {
    name: string;
    input: any;
    validate: (value: any, required: boolean, fieldProps: any) => boolean | string;
}

export type TFormField =
    | IFormFieldCounter
    | IFormFieldDate
    | IFormFieldDateTime
    | IFormFieldImage
    | IFormFieldNumber
    | IFormFieldPassword
    | IFormFieldRolePermissions
    | IFormFieldSelect
    | IFormFieldSelectFiltered
    | IFormFieldSwitcher
    | IFormFieldText
    | IFormFieldUser;

const FormAdapters: IFormAdapter[] = [
    CounterAdapter,
    DateAdapter,
    DateTimeAdapter,
    ImageAdapter,
    NumberAdapter,
    PasswordAdapter,
    RolePermissionsAdapter,
    SelectAdapter,
    SelectFilteredAdapter,
    SwitcherAdapter,
    TextAdapter,
    UserAdapter,
];

export default FormAdapters;
