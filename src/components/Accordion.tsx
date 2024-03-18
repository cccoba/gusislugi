import { useState, ReactNode } from "react";
import { Accordion as MuiAccordion, AccordionSummary, AccordionDetails, Typography, SxProps, Box } from "@mui/material";

import Icon from "./Icon";
import Image from "./Image";
import RawHtml from "./RawHtml";

export interface IAccordionItem {
    id: number | string;
    key?: number | string;
    title: string;
    description?: string;
    html?: string;
    icon?: string;
    image?: string;
    child?: ReactNode;
    titleAction?: ReactNode;
    sx?: SxProps;
    autoMount?: boolean;
}

interface IProps {
    values: IAccordionItem[];
    defaultActiveId?: number | string;
    autoMountAll?: boolean;
    titleVariant?:
        | "button"
        | "caption"
        | "h1"
        | "h2"
        | "h3"
        | "h4"
        | "h5"
        | "h6"
        | "inherit"
        | "subtitle1"
        | "subtitle2"
        | "body1"
        | "body2"
        | "overline";
}

function getSlotProps(mountAll?: boolean, mount?: boolean) {
    if (mountAll === true || mount === true) {
        if (mount === true || (mountAll === true && typeof mount === "undefined")) {
            return { transition: { unmountOnExit: true } };
        }
    }
    return undefined;
}

function Accordion({ values = [], titleVariant = "h5", defaultActiveId = 0, autoMountAll = false }: IProps) {
    const [active, setActive] = useState(defaultActiveId);
    const onChange = (id: any) => {
        setActive(active === id ? 0 : id);
    };
    if (!values?.length) {
        return null;
    }
    return (
        <>
            {values.map((v) => {
                return (
                    <MuiAccordion
                        key={typeof v?.key !== "undefined" ? v.key : v.id}
                        onChange={() => onChange(v.id)}
                        expanded={active === v.id}
                        sx={v.sx}
                        slotProps={getSlotProps(autoMountAll, v.autoMount)}
                    >
                        <AccordionSummary
                            expandIcon={<Icon name="down" />}
                            sx={{
                                "& .MuiAccordionSummary-content": {
                                    display: "block",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center!important",
                                }}
                            >
                                {!!v.image && (
                                    <Image
                                        style={{ marginRight: "6px" }}
                                        variant="circular"
                                        avatar
                                        image={v.image}
                                    />
                                )}
                                <Typography variant={titleVariant}>{v.title}</Typography>
                                {!!v.titleAction && v.titleAction}
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            {!!v?.child && v.child}
                            {!!v?.html && <RawHtml html={v.html} />}
                            {!!v?.description && <Typography>{v.description}</Typography>}
                        </AccordionDetails>
                    </MuiAccordion>
                );
            })}
        </>
    );
}

export default Accordion;
