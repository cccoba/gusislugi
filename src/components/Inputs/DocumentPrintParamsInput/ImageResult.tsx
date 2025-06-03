import { Box } from "@mui/material";

import type { IDocumentPrintParamDto } from "api/interfaces/DocumentPrint/IDocumentPrintParamDto";

import lang from "lang";
import { DocumentPrintParamTypeEnum } from "api/enums/DocumentPrintParamTypeEnum";
import type { IUserDto } from "api/interfaces/user/IUserDto";
import getConst from "api/common/getConst";
import { useAppSelector } from "api/hooks/redux";
import type { INationalityDto } from "api/interfaces/user/INationalityDto";
import { DocumentPrintParamAlignEnum } from "api/enums/DocumentPrintParamAlignEnum";
import { WeaponEnum } from "api/enums/WeaponEnum";

interface IProps {
    url: string;
    params: IDocumentPrintParamDto[];
    onItemClick: (param: IDocumentPrintParamDto) => void;
}

export default function DocumentPrintParamsImageResult({ url, params, onItemClick }: IProps) {
    const langPage = lang.components.documentPrintParams;
    const nationalities = useAppSelector((s) => s.user.nationalities);
    const toItemClick = (e: React.MouseEvent<HTMLDivElement>, param: IDocumentPrintParamDto) => {
        e.stopPropagation();
        onItemClick(param);
    };
    return (
        <Box
            position="relative"
            display="inline-block"
        >
            <img
                src={url}
                alt={langPage.result}
                style={{ display: "block" }}
                draggable={false}
            />

            {/* Отображение существующих параметров */}
            {params.map((param, index) => (
                <Box
                    key={index}
                    onClick={(e) => toItemClick(e, param)}
                    sx={{
                        position: "absolute",
                        left: `${param.x}px`,
                        top: `${param.y}px`,
                        width: `${param.width}px`,
                        height: `${param.height}px`,
                        fontSize: `${param.size * 4}px`,
                        color: param.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                            param.align === DocumentPrintParamAlignEnum.Center
                                ? "center"
                                : param.align === DocumentPrintParamAlignEnum.Right
                                ? "flex-end"
                                : "flex-start",
                        backgroundColor: "rgba(255,255,255,0.1)",
                        fontFamily: "Arial, sans-serif",
                        fontWeight: "normal",
                        textAlign: "center",
                        wordBreak: "break-word",
                        overflow: "hidden",
                        cursor: "pointer",
                        "&:hover": {
                            bgcolor: "divider",
                        },
                    }}
                >
                    {getTypeContent(param, { nationalities })}
                </Box>
            ))}
        </Box>
    );
}

function getTypeContent(param: IDocumentPrintParamDto, { nationalities }: { nationalities: INationalityDto[] }) {
    const userExample: IUserDto = {
        id: 1,
        guid: "1",
        nickname: "Логин",
        firstName: "Имя Фамилия",
        nationalityId: 1,
        weapon: WeaponEnum.MachineGun,
        roleId: 1,
        passport: "000-281951",
        registration: "Надгорная 4",
        image: getConst("document-print-generator-url") + "userExample.jpg",
        description: "Описание",
        jobPosition: "Должность",
        weaponPoints: 0,
        money: 1000,
        birthDate: "20.08.1984",
        role: { id: 1, title: "Admin", description: "", params: {} },
    };
    switch (param.type) {
        case DocumentPrintParamTypeEnum.Name:
            return userExample.firstName;
        case DocumentPrintParamTypeEnum.FirstName: {
            const arr = userExample.firstName.split(" ");
            return arr?.[0] || "";
        }
        case DocumentPrintParamTypeEnum.LastName: {
            const arr = userExample.firstName.split(" ");
            return arr?.[1] || "";
        }
        case DocumentPrintParamTypeEnum.BirthDate:
            return userExample.birthDate;
        case DocumentPrintParamTypeEnum.Nationality:
            return nationalities.find((x) => x.id === userExample.nationalityId)?.title || lang.unknown;
        case DocumentPrintParamTypeEnum.JobPosition:
            return userExample.jobPosition;
        case DocumentPrintParamTypeEnum.Passport:
            return userExample.passport;
        case DocumentPrintParamTypeEnum.Registration:
            return userExample.registration;
        case DocumentPrintParamTypeEnum.Weapon0:
            if (userExample.weapon >= 0) {
                return "_0_";
            }
            return "";
        case DocumentPrintParamTypeEnum.Weapon1:
            if (userExample.weapon >= 1) {
                return "1";
            }
            return "";
        case DocumentPrintParamTypeEnum.Weapon2:
            if (userExample.weapon >= 2) {
                return "2";
            }
            return "";
        case DocumentPrintParamTypeEnum.Weapon3:
            if (userExample.weapon >= 3) {
                return "3";
            }
            return "";
        case DocumentPrintParamTypeEnum.Image: {
            const width = param.width;
            const height = Math.round((531 * width) / 412);

            return (
                <img
                    src={userExample.image}
                    alt={userExample.firstName}
                    style={{
                        width: `${width}px`,
                        height: `${height}px`,
                    }}
                />
            );
        }
        case DocumentPrintParamTypeEnum.QrGuid: {
            const width = param.width;
            const height = Math.round((256 * width) / 256);
            return (
                <img
                    src={getConst("document-print-generator-url") + "qrExample.png"}
                    alt={userExample.firstName}
                    style={{
                        width: `${width}px`,
                        height: `${height}px`,
                    }}
                />
            );
        }
        default:
            return "";
    }
}
