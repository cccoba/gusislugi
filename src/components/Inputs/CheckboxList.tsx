import { Fragment, useEffect, useState } from "react";
import { Checkbox as MuiCheckbox, FormControlLabel, FormGroup, Divider } from "@mui/material";

import type { IInputProps } from "api/interfaces/components/IInputProps";

import FormControl from "./FormControl";

export interface ICheckboxListProps extends IInputProps<number[]> {
    values: { id: number; title: string }[];
    labelPosition?: "bottom" | "end" | "start" | "top";
    orientation?: "vertical" | "horizontal";
}
function getName(id: number) {
    return `s_${id}`;
}
function getId(name: string) {
    if (name.startsWith("s_")) {
        return parseInt(name.substring(2));
    }
    return 0;
}
export default function CheckboxList({
    label = "",
    fullWidth = true,
    error = false,
    helperText = "",
    values = [],
    required = false,
    variant = "outlined",
    value = [],
    labelPosition = "end",
    orientation = "vertical",
    disabled = false,
    readOnly = false,
    onChangeValue,
}: ICheckboxListProps) {
    const [localState, setLocalState] = useState<any>({});
    useEffect(() => {
        const newValues: any = {};
        for (const record of values) {
            newValues[getName(record.id)] = value.includes(record.id);
        }
        setLocalState(newValues);
    }, [values, value]);
    const toChange = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const newState = { ...localState };
        newState[e.target.name] = checked;

        const result: number[] = [];
        for (const name in newState) {
            if (Object.prototype.hasOwnProperty.call(newState, name)) {
                if (newState[name]) {
                    result.push(getId(name));
                }
            }
        }
        setLocalState(newState);
        onChangeValue(result);
    };

    return (
        <FormControl
            fullWidth={fullWidth}
            error={error}
            required={required}
            variant={variant}
            helperText={helperText}
            label={label}
            disabled={disabled}
            sx={{
                "&:hover .MuiDivider-root.subDivider": {
                    borderBottomColor: (theme) => theme.palette.divider,
                },
            }}
        >
            <FormGroup row={orientation === "horizontal"}>
                {values.map((x, index) => (
                    <Fragment key={x.id}>
                        {!!index && values.length > index && (
                            <Divider
                                sx={{ position: "static!important" }}
                                className="subDivider"
                            />
                        )}
                        <FormControlLabel
                            control={
                                <MuiCheckbox
                                    sx={{ py: "4px" }}
                                    color={error ? "error" : "primary"}
                                    checked={!!localState[getName(x.id)]}
                                    name={getName(x.id)}
                                    onChange={toChange}
                                />
                            }
                            label={x.title}
                            labelPlacement={labelPosition}
                            disabled={readOnly}
                            sx={{
                                "&:hover": {
                                    bgcolor: (theme) => theme.palette.divider,
                                },
                            }}
                        />
                    </Fragment>
                ))}
            </FormGroup>
        </FormControl>
    );
}
