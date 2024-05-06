import { useMemo, useState } from "react";

import lang, { sprintf } from "lang";
import { CRUDAsync } from "components";
import SendUserNotification, { ISendUserNotificationProps } from "components/SendUserNotification";
import { ICRUDAsyncAction, TCRUDAsyncActionCb } from "components/CRUDAsync/Main";

import { MessageStatusEnum } from "api/enums/MessageStatusEnum";
import { ICRUDAsyncListConfig } from "components/CRUDAsync/List";
import { wanteds2 } from "api/data";
import { useAppSelector } from "api/hooks/redux";
import { IWantedDto } from "api/interfaces/user/IWantedDto";
import { WantedTypeEnum } from "api/enums/WantedTypeEnum";

import { wantedsEditConfig, wantedsListConfig } from "./Wanteds";

const langPage = lang.pages.wanteds;

const defInitialData: IWantedDto = {
    id: 0,
    uid: 0,
    status: true,
    type: WantedTypeEnum.Minima,
    description: "",
};
interface IProps {
    userId?: number;
}

function Wanteds2({ userId }: IProps) {
    const currentUserRoleParams = useAppSelector((s) => s.user.user?.role?.params?.wanteds2);
    const [notificationData, setNotificationData] = useState<null | ISendUserNotificationProps>(null);
    const props = useMemo(() => {
        const newProps: { actions: ICRUDAsyncAction[]; initialData: IWantedDto; listConfig: ICRUDAsyncListConfig } = {
            actions: [
                { name: "list", cb: wanteds2.crudList },
                { name: "save", cb: onSaveStart as any },
                { name: "edit", cb: wanteds2.crudGet },
                { name: "delete", cb: wanteds2.crudDelete },
            ],
            initialData: { ...defInitialData },
            listConfig: { ...wantedsListConfig },
        };

        if (userId) {
            newProps.actions[0].cbArgs = [userId];
            newProps.actions[0].cb = wanteds2.crudUserList;
            newProps.initialData.uid = userId;
            newProps.listConfig.fields = newProps.listConfig.fields.filter(
                (x) => x.name !== "user" && x.name !== "image"
            );
        }
        return newProps;
    }, [userId]);
    function onSaveStart(data: IWantedDto) {
        return new Promise((resolve, reject) => {
            wanteds2.crudSave(data).then(resolve).catch(reject);
            setNotificationData({
                uid: data.uid,
                title: langPage.message.title,
                text: sprintf(langPage.message.text, data.status ? langPage.statusActive : langPage.statusNotActive),
            });
        });
    }
    const hideNotificationData = () => {
        setNotificationData(null);
    };
    return (
        <>
            {!!notificationData && (
                <SendUserNotification
                    {...notificationData}
                    status={MessageStatusEnum.Wanteds2}
                    onClose={hideNotificationData}
                />
            )}
            <CRUDAsync
                roles={[["wanteds2"]]}
                icon="wanteds2"
                backUrl={"/wanteds2"}
                title={langPage.title2}
                listConfig={props.listConfig}
                editConfig={wantedsEditConfig}
                actions={props.actions}
                permissions={currentUserRoleParams}
                initialValue={props.initialData}
                withOutPage={!!userId}
            />
        </>
    );
}

export default Wanteds2;
