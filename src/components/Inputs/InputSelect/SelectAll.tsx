import { Checkbox, FormControlLabel } from "@mui/material";
import lang from "lang";

interface IProps {
    valuesCount: number;
    selectedValuesCount: number;
}

export default function InputSelectAll({ valuesCount, selectedValuesCount }: IProps) {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={valuesCount === selectedValuesCount}
                    indeterminate={!!selectedValuesCount && valuesCount > selectedValuesCount}
                />
            }
            label={`${lang.components.inputAutocomplete.selectAll}${valuesCount > 0 ? " ( " + valuesCount + " )" : ""}`}
        />
    );
}
