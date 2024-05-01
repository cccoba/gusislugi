import { useMemo } from "react";
import dayjs from "dayjs";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { CRUDAsync, Icon } from "components";
import lang from "lang";

import { medicalInfoListConfig, medicalInfoEditConfig } from "pages/MedicalInfo";
import { useAppSelector } from "api/hooks/redux";
import { medicalInfo } from "api/data";
import { IMedicalInfoDto } from "api/interfaces/user/IMedicalInfoDto";

import { IPassportItem } from ".";

const langPage = lang.pages.medicalInfo;

const defInitialValue: IMedicalInfoDto = {
    id: 0,
    title: "",
    uid: 0,
    status: true,
    endDate: dayjs().add(24, "hour").toDate(),
};

function PassportMedicalInfo({ title, subTitle, user }: IPassportItem) {
    const permissions = useAppSelector((s) => s.user.user?.role.params?.medicalInfo);
    const props = useMemo(() => {
        const result = {
            listConfig: medicalInfoListConfig,
            editConfig: medicalInfoEditConfig,
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
                        { name: "list", cb: medicalInfo.crudUserList, cbArgs: [user.id] },
                        { name: "edit", cb: medicalInfo.crudGet },
                        { name: "delete", cb: medicalInfo.crudDelete },
                        { name: "save", cb: medicalInfo.crudSave },
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
export default PassportMedicalInfo;
