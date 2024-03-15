import { Box } from "@mui/material";

import lang from "lang";
import FooterActions, { IFooterAction } from "components/FooterActions";

import Image from "..";

interface IProps {
    imageSrc: string;
    onClose: (save: boolean) => void;
}

const actions: IFooterAction[] = [
    { icon: "cancel", name: "cancel", tooltip: lang.cancel },
    { icon: "ok", name: "save", tooltip: lang.save, color: "primary" },
];

function ImageCropperPreview({ imageSrc = "", onClose }: IProps) {
    const toAction = (actionName: string) => {
        onClose(actionName === "save");
    };
    return (
        <Box sx={{ textAlign: "center" }}>
            <Image
                url={imageSrc}
                style={{ maxWidth: "80%" }}
            />
            <FooterActions
                actions={actions}
                onAction={toAction}
            />
        </Box>
    );
}
export default ImageCropperPreview;
