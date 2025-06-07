import CounterAdapter, { type IFormFieldCounter } from "./Adapters/Counter";
import CompanyAdapter, { type IFormFieldCompany } from "./Adapters/Company";
import DateAdapter, { type IFormFieldDate } from "./Adapters/Date";
import DateTimeAdapter, { type IFormFieldDateTime } from "./Adapters/DateTime";
import IconSelectorAdapter, { type IFormFieldIconSelector } from "./Adapters/IconSelector";
import ImageAdapter, { type IFormFieldImage } from "./Adapters/Image";
import JsonAdapter, { type IFormFieldJson } from "./Adapters/Json";
import ListAdapter, { type IFormFieldList } from "./Adapters/List";
import ListMultipleAdapter, { type IFormFieldListMultiple } from "./Adapters/ListMultiple";
import MedicineDiseaseParamAdapter, { type IFormFieldMedicineDiseaseParam } from "./Adapters/MedicineDiseaseParam";
import NumberAdapter, { type IFormFieldNumber } from "./Adapters/Number";
import PasswordAdapter, { type IFormFieldPassword } from "./Adapters/Password";
import RolePermissionsAdapter, { type IFormFieldRolePermissions } from "./Adapters/RolePermissions";
import SelectAdapter, { type IFormFieldSelect } from "./Adapters/Select";
import SelectFilteredAdapter, { type IFormFieldSelectFiltered } from "./Adapters/SelectFiltered";
import SwitcherAdapter, { type IFormFieldSwitcher } from "./Adapters/Switcher";
import TextAdapter, { type IFormFieldText } from "./Adapters/Text";
import UserAdapter, { type IFormFieldUser } from "./Adapters/User";
import MedicineParamsSelectorAdapter, {
    type IFormFieldMedicineParamsSelector,
} from "./Adapters/MedicineParamsSelector";
import MedicineParamsActionsAdapter, { type IFormFieldMedicineParamsActions } from "./Adapters/MedicineParamsActions";
import MedicineTestAdapter, { type IFormFieldMedicineTest } from "./Adapters/MedicineTest";
import MedicineDiseaseConditionsAdapter, {
    type IFormFieldMedicineDiseaseConditions,
} from "./Adapters/MedicineDiseaseConditions";
import TimeDurationAdapter, { type IFormFieldTimeDuration } from "./Adapters/TimeDuration";
import DocumentPrintParamsAdapter, { type IFormFieldDocumentPrintParams } from "./Adapters/DocumentPrintParams";
import MedicalSicknessAdapter, { type IFormFieldMedicalSickness } from "./Adapters/MedicalSickness";
import TaxesTypesAdapter, { type IFormFieldTaxesTypes } from "./Adapters/TaxesTypes";
import type { IFormFieldHTML } from "./Adapters/HTML";
import HTMLAdapter from "./Adapters/HTML";
import CheckboxListAdapter, { type IFormFieldCheckboxList } from "./Adapters/CheckboxList";
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
    | IFormFieldCheckboxList
    | IFormFieldCounter
    | IFormFieldCompany
    | IFormFieldDate
    | IFormFieldDateTime
    | IFormFieldDocumentPrintParams
    | IFormFieldHTML
    | IFormFieldIconSelector
    | IFormFieldImage
    | IFormFieldList
    | IFormFieldListMultiple
    | IFormFieldJson
    | IFormFieldMedicineDiseaseConditions
    | IFormFieldMedicineDiseaseParam
    | IFormFieldMedicineParamsSelector
    | IFormFieldMedicineParamsActions
    | IFormFieldMedicineTest
    | IFormFieldMedicalSickness
    | IFormFieldTaxesTypes
    | IFormFieldNumber
    | IFormFieldPassword
    | IFormFieldRolePermissions
    | IFormFieldSelect
    | IFormFieldSelectFiltered
    | IFormFieldSwitcher
    | IFormFieldText
    | IFormFieldTimeDuration
    | IFormFieldUser;

const FormAdapters: IFormAdapter[] = [
    CheckboxListAdapter,
    CounterAdapter,
    CompanyAdapter,
    DateAdapter,
    DateTimeAdapter,
    DocumentPrintParamsAdapter,
    HTMLAdapter,
    IconSelectorAdapter,
    ImageAdapter,
    ListAdapter,
    ListMultipleAdapter,
    JsonAdapter,
    MedicineDiseaseConditionsAdapter,
    MedicineDiseaseParamAdapter,
    MedicineParamsSelectorAdapter,
    MedicineParamsActionsAdapter,
    MedicineTestAdapter,
    MedicalSicknessAdapter,
    TaxesTypesAdapter,
    NumberAdapter,
    PasswordAdapter,
    RolePermissionsAdapter,
    SelectAdapter,
    SelectFilteredAdapter,
    SwitcherAdapter,
    TextAdapter,
    TimeDurationAdapter,
    UserAdapter,
];

export default FormAdapters;
