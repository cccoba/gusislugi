import { useMemo } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { CRUDAsync, Icon } from "components";
import lang from "lang";

import { ClaimStatusEnum } from "api/enums/ClaimStatusEnum";
import { IClaimDto } from "api/interfaces/user/IClaimDto";
import { claimEditConfig, claimListConfig } from "pages/Claims";
import { useAppSelector } from "api/hooks/redux";
import { claims } from "api/data";

import { IPassportItem } from ".";

const langPage = lang.pages.claims;

const defInitialValue: IClaimDto = {
    id: 0,
    uid: 0,
    status: ClaimStatusEnum.Created,
    title: "",
    description: "",
    resolution: "",
};

function PassportClaims({ title, subTitle, user }: IPassportItem) {
    const permissions = useAppSelector((s) => s.user.user?.role.params?.claims);
    const props = useMemo(() => {
        const result = {
            listConfig: claimListConfig,
            editConfig: claimEditConfig,
            initialValue: defInitialValue,
        };
        result.initialValue.uid = user.id;
        result.listConfig.isMultiSelection = false;
        result.listConfig.fields = result.listConfig.fields.filter((x) => x.name !== "user");
        const uidField = result.editConfig.fields.find((x) => x.name === "uid");
        if (uidField) {
            uidField.disabled = true;
        }

        return result;
    }, [user.id]);
    return (
        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
            <AccordionSummary expandIcon={<Icon name="down" />}>
                {title} ( {subTitle} )
            </AccordionSummary>
            <AccordionDetails>
                <CRUDAsync
                    listConfig={props.listConfig}
                    actions={[
                        { name: "list", cb: claims.crudUserList, cbArgs: [user.id] },
                        { name: "edit", cb: claims.crudGet },
                        { name: "delete", cb: claims.crudDelete },
                        { name: "save", cb: claims.crudSave },
                    ]}
                    editConfig={props.editConfig}
                    initialValue={props.initialValue}
                    permissions={permissions || 0}
                    title={langPage.title}
                    withOutPage
                />
            </AccordionDetails>
        </Accordion>
    );
}
export default PassportClaims;
