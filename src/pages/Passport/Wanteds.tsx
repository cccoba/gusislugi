import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { Icon } from "components";
import Wanteds from "pages/Wanteds";
import Wanteds2 from "pages/Wanteds2";

import type { IPassportItem } from ".";

interface IProps extends IPassportItem {
    type: 1 | 2;
}
export default function PassportWanteds({ title, subTitle, userId, type, icon }: IProps) {
    return (
        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
            <AccordionSummary expandIcon={<Icon name="down" />}>
                <Icon
                    name={icon}
                    sx={{ mr: 1 }}
                />
                {title} ( {subTitle} )
            </AccordionSummary>
            <AccordionDetails>
                {type === 1 ? <Wanteds userId={userId} /> : <Wanteds2 userId={userId} />}
            </AccordionDetails>
        </Accordion>
    );
}
