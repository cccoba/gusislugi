import { useState, ReactNode, useEffect } from "react";
import { Accordion as MuiAccordion, AccordionSummary, AccordionDetails, Typography, SxProps, Box } from "@mui/material";

import Icon from "./Icon";
import Image from "./Image";
import RawHtml from "./RawHtml";

export interface IAccordionItem {
    id: number | string;
    key?: number | string;
    title: string | ReactNode;
    description?: string;
    html?: string;
    icon?: string;
    image?: string;
    child?: ReactNode;
    titleAction?: ReactNode;
    sx?: SxProps;
}

interface IProps {
    values: IAccordionItem[];
    defaultId?: number | string;
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
export default function Accordion({ values = [], titleVariant = "h5", defaultId = 0 }: IProps) {
    const [active, setActive] = useState(defaultId);
    useEffect(() => {
        setActive(defaultId);
    }, [defaultId]);
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
                    >
                        <AccordionSummary
                            expandIcon={<Icon name="down" />}
                            sx={{
                                "& .MuiAccordionSummary-content": {
                                    display: "block",
                                    m: 0,
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
                                {typeof v.title === "object" ? (
                                    v.title
                                ) : (
                                    <Typography variant={titleVariant}>{v.title}</Typography>
                                )}
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
