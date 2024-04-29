import { useMemo } from "react";
import dayjs from "dayjs";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { CRUDAsync, Icon } from "components";
import lang from "lang";

import { IFineDto } from "api/interfaces/user/IFineDto";
import { finesEditConfig, finesListConfig } from "pages/Fines";
import { TaxeStatusEnum } from "api/enums/TaxeStatusEnum";
import { useAppSelector } from "api/hooks/redux";
import { fines } from "api/data";

import { IPassportItem } from ".";

const langPage = lang.pages.fines;

const defInitialValue: IFineDto = {
    id: 0,
    uid: 0,
    title: "",
    value: 0,
    status: TaxeStatusEnum.Active,
    endDate: dayjs().add(8, "hour").toDate(),
};

function PassportFines({ title, subTitle, user }: IPassportItem) {
    const permissions = useAppSelector((s) => s.user.user?.role.params?.taxes);
    const props = useMemo(() => {
        const result = {
            listConfig: finesListConfig,
            editConfig: finesEditConfig,
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
                        { name: "list", cb: fines.crudUserList, cbArgs: [user.id] },
                        { name: "edit", cb: fines.crudGet },
                        { name: "delete", cb: fines.crudDelete },
                        { name: "save", cb: fines.crudSave },
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
export default PassportFines;
