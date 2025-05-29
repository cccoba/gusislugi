import { Box } from "@mui/material";

import type { IDocumentPrintParamDto } from "api/interfaces/DocumentPrint/IDocumentPrintParamDto";

import lang from "lang";
import { DocumentPrintParamTypeEnum } from "api/enums/DocumentPrintParamTypeEnum";
import type { IUserDto } from "api/interfaces/user/IUserDto";
import getConst from "api/common/getConst";
import { useAppSelector } from "api/hooks/redux";
import type { INationalityDto } from "api/interfaces/user/INationalityDto";
import type { ICitizenshipDto } from "api/interfaces/user/ICitizenshipDto";

import type { IDocumentPrintParamsCopyPosition } from ".";

interface IProps {
    url: string;
    params: IDocumentPrintParamDto[];
    onItemClick: (param: IDocumentPrintParamDto) => void;
}

export default function DocumentPrintParamsImageResult({ url, params, onItemClick }: IProps) {
    const langPage = lang.components.documentPrintParams;
    const nationalities = useAppSelector((s) => s.user.nationalities);
    const citizenships = useAppSelector((s) => s.user.citizenships);
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
                        justifyContent: "center",

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
                    {getTypeContent(param, { nationalities, citizenships })}
                </Box>
            ))}
        </Box>
    );
}

function getTypeContent(
    param: IDocumentPrintParamDto,
    { nationalities, citizenships }: { nationalities: INationalityDto[]; citizenships: ICitizenshipDto[] }
) {
    const userExample: IUserDto = {
        id: 1,
        guid: "1",
        nickname: "Логин",
        firstName: "Имя Фамилия",
        nationalityId: 1,
        citizenshipId: 1,
        roleId: 1,
        passport: "000-281951",
        registration: "1234567890",
        image: getConst("document-print-generator-url") + "userExample.jpg",
        description: "Описание",
        money: 1000,
        birthDate: "20.08.1984",
        role: { id: 1, title: "Admin", description: "", params: {} },
    };
    switch (param.type) {
        case DocumentPrintParamTypeEnum.FirstName:
            return userExample.firstName;
        case DocumentPrintParamTypeEnum.BirthDate:
            return userExample.birthDate;
        case DocumentPrintParamTypeEnum.Nationality:
            return nationalities.find((x) => x.id === userExample.nationalityId)?.title || lang.unknown;
        case DocumentPrintParamTypeEnum.Citizenship:
            return citizenships.find((x) => x.id === userExample.citizenshipId)?.title || lang.unknown;
        case DocumentPrintParamTypeEnum.Passport:
            return userExample.passport;
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
