import { useMemo } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { CRUDAsync, Icon } from "components";
import lang from "lang";

import { wantedsEditConfig, wantedsListConfig } from "pages/Wanteds/Wanteds";
import { useAppSelector } from "api/hooks/redux";
import { wanteds2 } from "api/data";
import { IWantedDto } from "api/interfaces/user/IWantedDto";
import { WantedTypeEnum } from "api/enums/WantedTypeEnum";

import { IPassportItem } from ".";

const langPage = lang.pages.wanteds;

const defInitialValue: IWantedDto = {
    id: 0,
    uid: 0,
    status: true,
    type: WantedTypeEnum.Minima,
    description: "",
};

function PassportWanteds2({ title, subTitle, user }: IPassportItem) {
    const permissions = useAppSelector((s) => s.user.user?.role.params?.wanteds);
    const props = useMemo(() => {
        const result = {
            listConfig: wantedsListConfig,
            editConfig: wantedsEditConfig,
            initialValue: defInitialValue,
        };
        result.initialValue.uid = user.id;
        result.listConfig.isMultiSelection = false;
        result.listConfig.fields = result.listConfig.fields.filter((x) => x.name !== "image" && x.name !== "user");
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
                        { name: "list", cb: wanteds2.crudUserList, cbArgs: [user.id] },
                        { name: "edit", cb: wanteds2.crudGet },
                        { name: "delete", cb: wanteds2.crudDelete },
                        { name: "save", cb: wanteds2.crudSave },
                    ]}
                    editConfig={props.editConfig}
                    initialValue={props.initialValue}
                    permissions={permissions || 0}
                    title={langPage.title2}
                    withOutPage
                />
            </AccordionDetails>
        </Accordion>
    );
}
export default PassportWanteds2;
