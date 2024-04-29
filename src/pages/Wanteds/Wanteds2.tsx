import { useState } from "react";

import lang, { sprintf } from "lang";
import { CRUDAsync } from "components";
import SendUserNotification, { ISendUserNotificationProps } from "components/SendUserNotification";
import { TCRUDAsyncActionCb } from "components/CRUDAsync/Main";

import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { wanteds2 } from "api/data";
import { useAppSelector } from "api/hooks/redux";
import { IWantedDto } from "api/interfaces/user/IWantedDto";
import { WantedTypeEnum } from "api/enums/WantedTypeEnum";

import { wantedsEditConfig, wantedsListConfig } from "./Wanteds";

const langPage = lang.pages.wanteds;

function Wanteds2({ roles, icon, backUrl }: IPageWithRoles) {
    const currentUserRoleParams = useAppSelector((s) => s.user.user?.role?.params?.wanteds2);
    const [notificationData, setNotificationData] = useState<null | ISendUserNotificationProps>(null);
    const onSaveStart: TCRUDAsyncActionCb = async (data: IWantedDto) => {
        return new Promise((resolve, reject) => {
            wanteds2.crudSave(data).then(resolve).catch(reject);
            setNotificationData({
                uid: data.uid,
                title: langPage.message.title,
                text: sprintf(langPage.message.text, data.status ? langPage.statusActive : langPage.statusNotActive),
            });
        });
    };
    const hideNotificationData = () => {
        setNotificationData(null);
    };
    return (
        <>
            {!!notificationData && (
                <SendUserNotification
                    {...notificationData}
                    onClose={hideNotificationData}
                />
            )}
            <CRUDAsync
                backUrl={backUrl || "/"}
                roles={roles}
                title={langPage.title2}
                icon={icon}
                listConfig={wantedsListConfig}
                editConfig={wantedsEditConfig}
                actions={[
                    { name: "list", cb: wanteds2.crudList },
                    { name: "delete", cb: wanteds2.crudDelete },
                    { name: "edit", cb: wanteds2.crudGet },
                    { name: "save", cb: onSaveStart },
                ]}
                permissions={currentUserRoleParams}
                initialValue={{
                    id: 0,
                    uid: 0,
                    status: true,
                    type: WantedTypeEnum.Minima,
                    description: "",
                }}
            />
        </>
    );
}

export default Wanteds2;
