import { RolePermissionFlag } from "api/enums/RolePermissionFlag";
import { useAppSelector } from "api/hooks/redux";
import type { IUserDto } from "api/interfaces/user/IUserDto";
import lang, { getEnumTitleValue, sprintf } from "lang";

import { checkFlagIncludes } from "api/common/enumHelper";

import { GoodTable } from "components";

import type { IWeaponHistoryDto } from "api/interfaces/user/IWeaponHistoryDto";

import { useMemo, useState } from "react";

import type { IGoodTableField } from "components/GoodTable";
import { WeaponEnum } from "api/enums/WeaponEnum";

import type { ISendUserNotificationProps } from "components/SendUserNotification";
import SendUserNotification from "components/SendUserNotification";

import { MessageStatusEnum } from "api/enums/MessageStatusEnum";

import type { IWeaponUpdaterDto } from "api/interfaces/user/IWeaponUpdaterDto";

import WeaponsUpdater from "./Updater";

interface IProps {
    data: IWeaponHistoryDto[];
    weaponPoints: number;
    onUpdate: () => void;
    user?: IUserDto;
}

export default function Weapons({ weaponPoints, onUpdate, user, data }: IProps) {
    const weaponPermissions = useAppSelector((s) => s.user.user?.role?.params.weapons);
    const langPage = lang.pages.weapons;
    const [notificationData, setNotificationData] = useState<null | ISendUserNotificationProps>(null);

    const tableFields = useMemo(() => {
        const newFields: IGoodTableField[] = [
            {
                name: "result",
                title: langPage.weapon,
            },
            {
                name: "created_at",
                title: lang.created_at,
                format: "date",
            },

            {
                name: "creatorName",
                title: langPage.creator,
            },
        ];
        if (!user) {
            newFields.unshift({
                name: "userName",
                title: lang.user,
            });
        }
        return newFields;
    }, [user?.id]);
    const values = useMemo(() => {
        if (data) {
            return data.map((v) => ({
                ...v,
                userName: v.user?.firstName,
                creatorName: v.creator?.firstName,
                result: `${getEnumTitleValue(WeaponEnum, "WeaponEnum", v.previousWeaponValue)} -> ${getEnumTitleValue(
                    WeaponEnum,
                    "WeaponEnum",
                    v.newWeaponValue
                )}`,
            }));
        }
        return [];
    }, [data]);
    const toUpdate = (data: IWeaponUpdaterDto) => {
        setNotificationData({
            uid: data.userId,
            title: langPage.message.title,
            text: sprintf(langPage.message.text, getEnumTitleValue(WeaponEnum, "WeaponEnum", data.weapon)),
        });
        onUpdate();
    };
    const hideNotificationData = () => {
        setNotificationData(null);
    };
    return (
        <>
            {!!notificationData && (
                <SendUserNotification
                    {...notificationData}
                    status={MessageStatusEnum.Weapons}
                    onClose={hideNotificationData}
                />
            )}
            {!!user &&
                (checkFlagIncludes(weaponPermissions || 0, RolePermissionFlag.Add) ||
                    checkFlagIncludes(weaponPermissions || 0, RolePermissionFlag.Edit)) && (
                    <WeaponsUpdater
                        weaponPermissions={weaponPermissions || 0}
                        user={user}
                        weaponPoints={weaponPoints}
                        onUpdate={toUpdate}
                    />
                )}
            {checkFlagIncludes(weaponPermissions || 0, RolePermissionFlag.View) && (
                <GoodTable
                    values={values}
                    fields={tableFields}
                />
            )}
        </>
    );
}
