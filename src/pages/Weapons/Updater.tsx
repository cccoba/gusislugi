import { Typography } from "@mui/material";
import { checkFlagIncludes } from "api/common/enumHelper";
import { users, webApiResultData } from "api/data";
import { RolePermissionFlag } from "api/enums/RolePermissionFlag";
import { WeaponEnum } from "api/enums/WeaponEnum";
import { useLoader } from "api/hooks/redux";
import { useNotifier } from "api/hooks/useNotifier";
import type { IUserDto } from "api/interfaces/user/IUserDto";
import type { IWeaponUpdaterDto } from "api/interfaces/user/IWeaponUpdaterDto";
import { Confirm, Form } from "components";
import type { IConfirmProps } from "components/Confirm";
import lang, { getEnumSelectValues, getEnumTitleValue, sprintf } from "lang";
import { useMemo, useState } from "react";

interface IProps {
    user: IUserDto;
    weaponPoints: number;
    weaponPermissions: RolePermissionFlag;
    onUpdate: (data: IWeaponUpdaterDto) => void;
}

export default function WeaponsUpdater({ weaponPermissions, user, weaponPoints, onUpdate }: IProps) {
    const langPage = lang.pages.weapons;
    const [addConfirmData, setAddConfirmData] = useState<IConfirmProps | null>(null);
    const { showError, showSuccess } = useNotifier();
    const { setIsLoading } = useLoader();

    const weaponEditPermissionType = useMemo(() => {
        if (checkFlagIncludes(weaponPermissions || 0, RolePermissionFlag.Edit)) {
            return "edit";
        }
        if (checkFlagIncludes(weaponPermissions || 0, RolePermissionFlag.Add)) {
            return "add";
        }

        return "none";
    }, [weaponPermissions]);
    const toEdit = ({ weapon }: { weapon: WeaponEnum }) => {
        setIsLoading(true);
        users.weapons
            .save({
                userId: user.id,
                weapon,
            })
            .then((res) => {
                const { error, result } = webApiResultData<any>(res);
                if (error) {
                    throw error;
                }
                if (result) {
                    showSuccess(langPage.success.updateWeapon);
                    setAddConfirmData(null);
                    onUpdate({
                        userId: user.id,
                        weapon,
                    });
                }
            })
            .catch((err) => {
                showError(err?.name === "webApiResultError" ? err.message : langPage.errors.updateWeapon);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    function toAdd(result: boolean, otherProps: IWeaponUpdaterDto) {
        if (result) {
            setIsLoading(true);
            users.weapons
                .add(otherProps)
                .then((res) => {
                    const { error, result } = webApiResultData<boolean>(res);
                    if (error) {
                        throw error;
                    }
                    if (result) {
                        showSuccess(langPage.success.updateWeapon);
                        setAddConfirmData(null);
                        onUpdate(otherProps);
                    }
                })
                .catch((err) => {
                    showError(err?.name === "webApiResultError" ? err.message : langPage.errors.updateWeapon);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setAddConfirmData(null);
        }
    }
    const toAddConfirm = ({ weapon }: { weapon: WeaponEnum }) => {
        if (weapon <= user.weapon) {
            setAddConfirmData({
                open: true,
                title: lang.warning,
                text: langPage.confirm.selectVariant,
                onClose: () => setAddConfirmData(null),
            });
        } else if (weapon - user.weapon > weaponPoints) {
            setAddConfirmData({
                open: true,
                title: lang.warning,
                text: sprintf(langPage.confirm.needWeapons, weapon - user.weapon, weaponPoints),
                onClose: () => setAddConfirmData(null),
            });
        } else {
            setAddConfirmData({
                open: true,
                title: lang.warning,
                text: sprintf(
                    langPage.confirm.textConfirm,
                    getEnumTitleValue(WeaponEnum, "WeaponEnum", weapon),
                    weapon - user.weapon
                ),
                otherProps: {
                    userId: user.id,
                    weapon,
                },
                onClose: toAdd,
            });
        }
    };
    if (weaponEditPermissionType === "edit") {
        return (
            <Form
                fields={[
                    {
                        name: "weapon",
                        title: langPage.weapon,
                        type: "select",
                        values: getEnumSelectValues(WeaponEnum, "WeaponEnum"),
                    },
                ]}
                values={{
                    weapon: user.weapon,
                }}
                onSubmit={toEdit}
                submitBtnType="save"
            />
        );
    }
    if (weaponEditPermissionType === "add") {
        if (user.weapon === WeaponEnum.MachineGun) {
            return <>{langPage.isMax}</>;
        }
        return (
            <>
                {!!addConfirmData && <Confirm {...addConfirmData} />}
                <Typography>{sprintf(langPage.addTitle, weaponPoints)}</Typography>
                <Form
                    fields={[
                        {
                            name: "weapon",
                            title: langPage.weapon,
                            type: "select",
                            values: getEnumSelectValues(WeaponEnum, "WeaponEnum").filter((x) => x.id >= user.weapon),
                        },
                    ]}
                    values={{
                        weapon: user.weapon,
                    }}
                    onSubmit={toAddConfirm}
                    saveDisabled={!weaponPoints}
                    submitBtnType="save"
                    submitBtnText={langPage.add}
                />
            </>
        );
    }
    return <>{weaponEditPermissionType}</>;
}
