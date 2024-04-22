import { useMemo } from "react";
import { Box, List, Paper } from "@mui/material";

import IconButton from "components/Icon/IconButton";
import FormControl from "components/Inputs/FormControl";
import lang from "lang";

import { IInputProps } from "api/interfaces/components/IInputProps";

import TreeItem from "./Item";

import { ITreeItem } from ".";

interface IProps extends IInputProps<string | number | undefined> {
    values: ITreeItem[];
    currentId?: string | number;
}

const langPage = lang.components.treeViewer;

function filterValues(departments: ITreeItem[], currentId?: string | number): ITreeItem[] {
    return departments.reduce((acc: ITreeItem[], dept): ITreeItem[] => {
        if (!currentId || dept.id !== currentId) {
            const filteredChildrens = !!dept?.childrens?.length ? filterValues(dept.childrens, currentId) : [];
            acc.push({ ...dept, childrens: filteredChildrens });
        }
        return acc;
    }, []);
}

function InputTreeViewer({
    fullWidth = true,
    value = undefined,
    values = [],
    error,
    required,
    variant,
    helperText,
    label,
    currentId,
    onChangeValue,
}: IProps) {
    const filteredValues = useMemo(() => filterValues(values, currentId), [values, currentId]);
    const onClearValue = () => {
        onChangeValue(undefined);
    };
    return (
        <FormControl
            fullWidth={fullWidth}
            error={error}
            required={required}
            variant={variant}
            helperText={helperText}
            label={label}
        >
            <Paper sx={{ position: "relative", mb: 0.5 }}>
                <List
                    component={Box}
                    sx={{ p: 0, mb: 1 }}
                >
                    {filteredValues.map((v) => (
                        <TreeItem
                            key={typeof v.key !== "undefined" ? v.key : v.id}
                            {...v}
                            onSelect={onChangeValue}
                            value={value}
                            type="input"
                        />
                    ))}
                </List>
                {!required && !!value && (
                    <Box sx={{ maxWidth: "24px", position: "absolute", right: 0, top: "-24px" }}>
                        <IconButton
                            name="cancel"
                            size="small"
                            onClick={onClearValue}
                            color="primary"
                            tooltip={langPage.clearValue}
                        />
                    </Box>
                )}
            </Paper>
        </FormControl>
    );
}
export default InputTreeViewer;
