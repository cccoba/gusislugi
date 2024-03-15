import { useMemo } from "react";
import { Tooltip } from "@mui/material";

import lang from "lang";
import MenuList from "components/MenuList";
import IconButton from "components/Icon/IconButton";
import { ISelectValue } from "components/Inputs/Select";

import { TImageCropperVariant } from ".";

const langPage = lang.components.image.cropper.selector;

interface IProps {
    cropVariants: TImageCropperVariant[];
    cropVariant: TImageCropperVariant;
    onChange: (variant: TImageCropperVariant) => void;
}

function getVariantIcon(variant: TImageCropperVariant) {
    switch (variant) {
        case "horizontal":
            return "crop_landscape";
        case "vertical":
            return "crop_portrait";
        case "square":
            return "crop_square";
        default:
            return "crop";
    }
}

function CropSelector({ cropVariants = [], cropVariant, onChange }: IProps) {
    const values = useMemo(() => {
        const newValues: ISelectValue[] = [];
        for (const value of cropVariants) {
            newValues.push({
                id: value,
                title: langPage[value],
                icon: getVariantIcon(value),
            });
        }
        return newValues;
    }, [cropVariants]);
    const toChangeVariant = (newVariant: ISelectValue) => {
        onChange(newVariant.id);
    };
    if (!cropVariants?.length) {
        return null;
    }
    return (
        <MenuList
            values={values}
            value={cropVariant}
            onChange={toChangeVariant}
        >
            <Tooltip title={langPage.tooltip}>
                <span>
                    <IconButton
                        name={getVariantIcon(cropVariant)}
                        size="large"
                        sx={{
                            color: "#fff",
                            bgcolor: "secondary.main",
                            border: "1px solid #fff",
                            "&:hover": {
                                bgcolor: "secondary.main",
                            },
                        }}
                    ></IconButton>
                </span>
            </Tooltip>
        </MenuList>
    );
}
export default CropSelector;
