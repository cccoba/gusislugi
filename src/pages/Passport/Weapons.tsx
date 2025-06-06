import { useMemo } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { checkFlagIncludes } from "api/common/enumHelper";
import { RolePermissionFlag } from "api/enums/RolePermissionFlag";
import { useAppSelector } from "api/hooks/redux";
import type { IUserDto } from "api/interfaces/user/IUserDto";
import type { IWeaponHistoryDto } from "api/interfaces/user/IWeaponHistoryDto";

import { Icon } from "components";
import lang from "lang";
import Weapons from "pages/Weapons";

interface IProps {
    user: IUserDto;
    weaponPoints: number;
    data: IWeaponHistoryDto[];
    onUpdate: () => void;
}

export default function PassportWeapons({ data, user, weaponPoints, onUpdate }: IProps) {
    const langPage = lang.pages.weapons;
    const weaponPermissions = useAppSelector((s) => s.user.user?.role?.params.weapons);
    const title = useMemo(() => {
        if (checkFlagIncludes(weaponPermissions || 0, RolePermissionFlag.View)) {
            return `${langPage.title} ( ${data?.length} )`;
        }
        return langPage.title;
    }, [weaponPermissions, data, weaponPoints]);
    return (
        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
            <AccordionSummary expandIcon={<Icon name="down" />}>
                <Icon name="weapons" />
                {title}
            </AccordionSummary>
            <AccordionDetails>
                <Weapons
                    data={data}
                    user={user}
                    weaponPoints={weaponPoints}
                    onUpdate={onUpdate}
                />
            </AccordionDetails>
        </Accordion>
    );
}
