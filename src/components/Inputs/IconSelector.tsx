import { useMemo } from "react";
import { IInputProps } from "api/interfaces/components/IInputProps";
import { IconList, TIconName } from "components/Icon";

import { ISelectValue } from "./Select";
import InputAutocomplete from "./InputAutocomplete";

interface IProps extends IInputProps<TIconName | ""> {
    InputProps?: any;
}

export default function IconSelector({ variant = "standard", onChangeValue, value, InputProps, ...props }: IProps) {
    const iconValues = useMemo<ISelectValue[]>(() => {
        return IconList.map((iconName) => ({
            id: iconName,
            title: iconName,
            icon: iconName as TIconName,
        }));
    }, []);
    return (
        <InputAutocomplete
            values={iconValues}
            rightArrow={true}
            variant={variant === "standard" ? variant : undefined}
            onChange={onChangeValue}
            value={value}
            showIconInResult
            {...props}
        />
    );
}
