import { useMemo } from "react";

import lang from "lang";
import FooterActions, { IFooterAction } from "components/FooterActions";

import { useAppSelector } from "api/hooks/redux";

import CropSelector from "./CropSelector";

import { TImageCropperAction, TImageCropperVariant } from ".";

const langPage = lang.components.image.cropper.actions;
interface IProps {
    actions?: TImageCropperAction[];
    onAction: (action: TImageCropperAction, value?: any) => void;
    cropVariants: TImageCropperVariant[];
    cropVariant: TImageCropperVariant;
}

function ImageCropperActions({ actions = [], onAction, cropVariant, cropVariants = [] }: IProps) {
    const isMobile = useAppSelector((s) => s.device.isMobile);
    const actionList = useMemo(() => {
        const newActions: IFooterAction[] = [];
        if (actions?.length) {
            for (const actionName of actions) {
                switch (actionName) {
                    case "crop":
                        break;
                    case "save":
                    case "close":
                        newActions.push({
                            icon: actionName,
                            tooltip: langPage[actionName],
                            name: actionName,
                            color: actionName === "save" ? "primary" : "default",
                        });
                        break;
                    case "rotate":
                        if (!isMobile) {
                            newActions.push({
                                icon: "rotate_right",
                                tooltip: langPage.rotateRight,
                                name: "rotateRight",
                            });
                            newActions.push({
                                icon: "rotate_left",
                                tooltip: langPage.rotateLeft,
                                name: "rotateLeft",
                            });
                        }
                        break;
                    case "reset":
                        newActions.push({
                            icon: "autorenew",
                            tooltip: langPage[actionName],
                            name: actionName,
                        });
                        break;
                }
            }
        }
        return newActions;
    }, [actions, isMobile]);
    const toAction = (actionName: string) => {
        switch (actionName) {
            case "save":
            case "close":
            case "reset":
                onAction(actionName);
                break;
            case "rotateRight":
                onAction("rotate", "right");
                break;
            case "rotateLeft":
                onAction("rotate", "left");
                break;
        }
    };
    return (
        <FooterActions
            startChildren={
                !!actions.includes("crop") ? (
                    <CropSelector
                        cropVariant={cropVariant}
                        cropVariants={cropVariants}
                        onChange={(variant: TImageCropperVariant) => onAction("crop", variant)}
                    />
                ) : null
            }
            actions={actionList}
            onAction={toAction}
        />
    );
}
export default ImageCropperActions;
