import { Slider, SliderProps } from "@mui/material";
import { IMedicineParam } from "api/interfaces/Medicine/IMedicineParam";
import { useMemo } from "react";

interface IProps {
    param: IMedicineParam;
    value: string;
}
export default function MedicineParamDigitalViewer({ param, value }: IProps) {
    const sliderProps = useMemo<SliderProps>(() => {
        const valueInt = parseInt(value);
        const minValue = parseInt(param.minValue) || 0;
        const maxValue = parseInt(param.maxValue) || 100;
        const baseValue = parseInt(param.baseValue) || 1;
        const marks = [
            { value: minValue, label: minValue.toString() },
            { value: baseValue, label: baseValue.toString() },
            { value: maxValue, label: maxValue.toString() },
        ];
        const markIndex = marks.map((x) => x.value).indexOf(valueInt);
        const labelSuffix = param.unit ? " " + param.unit : "";
        if (markIndex === -1) {
            marks.push({ value: valueInt, label: valueInt.toString() + labelSuffix });
        }

        return {
            value: valueInt,
            min: minValue,
            max: maxValue,
            size: "small",
            step: 1,
            valueLabelDisplay: "auto",
            color: valueInt === baseValue ? "success" : "info",
            marks: marks,
            valueLabelFormat: (value) => value.toString() + labelSuffix,
            slotProps: {
                markLabel: {
                    sx: {
                        fontSize: "0.75em",
                    },
                },
            },
        };
    }, [value, param]);

    return <Slider {...sliderProps} />;
}
