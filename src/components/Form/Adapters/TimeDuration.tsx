import InputTimeDuration, { IInputTimeDurationProps } from "components/Inputs/InputTimeDuration";

import { IFormAdapter, IFormAdapterInputProps, IFormField } from "../FormAdapters";

export interface IFormFieldTimeDuration extends IFormField {
    type: "timeDuration";
    fieldProps?: Partial<IInputTimeDurationProps>;
}

const TimeDurationAdapter: IFormAdapter = {
    name: "timeDuration",
    input: FormInput,
    validate: (v, required) => {
        if (required) {
            if (!v) {
                return false;
            }
        }
        return true;
    },
};

function FormInput({ fieldProps, fieldParams, ...props }: IFormAdapterInputProps) {
    return (
        <InputTimeDuration
            {...props}
            {...fieldParams}
            {...fieldProps}
        />
    );
}

export default TimeDurationAdapter;
