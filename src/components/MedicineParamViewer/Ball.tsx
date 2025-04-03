import { Slider, SliderProps, Typography } from "@mui/material";
import { IMedicineParam } from "api/interfaces/Medicine/IMedicineParam";
import { useMemo } from "react";

interface IProps {
    param: IMedicineParam;
    value: string;
}
export default function MedicineParamBallViewer({ param, value }: IProps) {
    const sliderProps = useMemo<SliderProps>(() => {
        const valueInt = parseInt(value);
        let color: SliderProps["color"] = "error";
        if (valueInt >= 4) {
            color = "success";
        } else if (valueInt >= 2) {
            color = "warning";
        }
        const marks = [
            { value: 1, label: <Typography sx={{ color: "error.main", fontSize: "0.75em" }}>1</Typography> },
            { value: 5, label: <Typography sx={{ color: "success.main", fontSize: "0.75em" }}>5</Typography> },
        ];
        if (valueInt > 1 && valueInt < 5) {
            marks.push({
                value: valueInt,
                label: <Typography sx={{ color: color + ".main", fontSize: "0.75em" }}>{valueInt}</Typography>,
            });
        }
        return {
            value: valueInt,
            color,
            min: 1,
            max: 5,
            step: 1,
            size: "small",
            valueLabelDisplay: "auto",
            marks: marks,
        };
    }, [value]);
    return <Slider {...sliderProps} />;
}
