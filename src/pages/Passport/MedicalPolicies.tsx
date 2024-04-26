import { useMemo } from "react";
import dayjs from "dayjs";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { CRUDAsync, Icon } from "components";
import lang from "lang";

import { medicalPoliciesEditConfig, medicalPoliciesListConfig } from "pages/MedicalPolicies";
import { useAppSelector } from "api/hooks/redux";
import { medicalPolicies } from "api/data";

import { IMedicalPoliciesDto } from "api/interfaces/user/IMedicalPoliciesDto";
import { generateRandomString } from "api/common/helper";
import { MedicalPoliciesTypeEnum } from "api/enums/MedicalPoliciesTypeEnum";

import { IPassportItem } from ".";

const langPage = lang.pages.medicalPolicies;

const defInitialValue: IMedicalPoliciesDto = {
    id: 0,
    number: generateRandomString(10, "1234567890"),
    uid: 0,
    type: MedicalPoliciesTypeEnum.Oms,
    trauma_rescue: false,
    status: true,
    endDate: dayjs().add(24, "hour").toDate(),
};

function PassportMedicalPolicies({ title, subTitle, user }: IPassportItem) {
    const permissions = useAppSelector((s) => s.user.user?.role.params?.medicalPolicies);
    const props = useMemo(() => {
        const result = {
            listConfig: medicalPoliciesListConfig,
            editConfig: medicalPoliciesEditConfig,
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
                        { name: "list", cb: medicalPolicies.crudUserList, cbArgs: [user.id] },
                        { name: "edit", cb: medicalPolicies.crudGet },
                        { name: "delete", cb: medicalPolicies.crudDelete },
                        { name: "save", cb: medicalPolicies.crudSave },
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
export default PassportMedicalPolicies;
