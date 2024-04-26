import { useMemo } from "react";
import dayjs from "dayjs";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { CRUDAsync, Icon } from "components";
import lang from "lang";

import { ITaxeDto } from "api/interfaces/user/ITaxeDto";
import { taxesEditConfig, taxesListConfig } from "pages/Taxes";
import { TaxeStatusEnum } from "api/enums/TaxeStatusEnum";
import { useAppSelector } from "api/hooks/redux";
import { taxes } from "api/data";

import { IPassportItem } from ".";

const langPage = lang.pages.taxes;

const defInitialValue: ITaxeDto = {
    id: 0,
    uid: 0,
    title: "",
    value: 0,
    status: TaxeStatusEnum.Active,
    endDate: dayjs().add(8, "hour").toDate(),
};

function PassportTaxes({ title, subTitle, user }: IPassportItem) {
    const permissions = useAppSelector((s) => s.user.user?.role.params?.taxes);
    const props = useMemo(() => {
        const result = {
            listConfig: taxesListConfig,
            editConfig: taxesEditConfig,
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
                        { name: "list", cb: taxes.crudUserList, cbArgs: [user.id] },
                        { name: "edit", cb: taxes.crudGet },
                        { name: "delete", cb: taxes.crudDelete },
                        { name: "save", cb: taxes.crudSave },
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
export default PassportTaxes;
