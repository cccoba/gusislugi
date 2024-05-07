import { useMemo } from "react";

import lang from "lang";
import FooterActions, { IFooterAction } from "components/FooterActions";

import { TImageViewerAction } from ".";

const langPage = lang.components.image.viewer.actions;
interface IProps {
    actions?: TImageViewerAction[];
    onAction: (action: TImageViewerAction, value?: any) => void;
}

function ImageViewerActions({ actions = [], onAction }: IProps) {
    const actionList = useMemo(() => {
        const newActions: IFooterAction[] = [];
        if (actions?.length) {
            for (const actionName of actions) {
                switch (actionName) {
                    case "download":
                        newActions.push({
                            icon: actionName,
                            tooltip: langPage[actionName],
                            name: actionName,
                        });
                        break;
                    case "rotate":
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
                        break;
                    case "reset":
                        newActions.push({
                            icon: "reset",
                            tooltip: langPage[actionName],
                            name: actionName,
                        });
                        break;
                    case "close":
                        newActions.push({
                            icon: "close",
                            tooltip: langPage[actionName],
                            name: actionName,
                            color: "error",
                        });
                        break;
                }
            }
        }
        return newActions;
    }, [actions]);
    const toAction = (actionName: string) => {
        switch (actionName) {
            case "download":
            case "reset":
            case "close":
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
            actions={actionList}
            onAction={toAction}
        />
    );
}
export default ImageViewerActions;
