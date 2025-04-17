import { useMemo, useState } from "react";
import { Typography } from "@mui/material";

import lang, { getEnumTitleValue } from "lang";
import { IKeyValueListItem, IListItem, KeyValueList, List, Modal, UserView } from "components";

import { IMedicinePatientHistoryDto } from "api/interfaces/Medicine/IMedicinePatientHistoryDto";
import { IMedicinePatientTestDto } from "api/interfaces/Medicine/IMedicinePatientTestDto";
import { MedicinePatientTestStatusEnum } from "api/enums/MedicinePatientTestStatusEnum";
import dateTime from "api/common/dateTime";
import { IMedicinePatientProcedureDto } from "api/interfaces/Medicine/IMedicinePatientProcedureDto";
import useGetData from "store/rtkProvider";
import { IMedicineParam } from "api/interfaces/Medicine/IMedicineParam";

interface IProps {
    histories: IMedicinePatientHistoryDto<IMedicinePatientTestDto | IMedicinePatientProcedureDto>[];
}

export default function MedicinePatientHistory({ histories }: IProps) {
    const langPage = lang.pages.medicine.history;

    const { data: medicineParams } = useGetData<IMedicineParam[]>("medicineParams", []);
    const [selectedHistory, setSelectedHistory] = useState<IListItem | null>(null);

    const values = useMemo<IListItem[]>(() => {
        if (!histories?.length) {
            return [];
        }
        return histories
            .map((history) => {
                if (history.type === "test") {
                    const value = history.value as IMedicinePatientTestDto;
                    return {
                        title: `${langPage.test}: ${value.test?.title || lang.unknown}`,
                        subTitle: `${getEnumTitleValue(
                            MedicinePatientTestStatusEnum,
                            "MedicinePatientTestStatusEnum",
                            value.status
                        )} ${dateTime(value.updated_at)}`,
                        id: history.id,
                        otherProps: history,
                    };
                }
                return {
                    title: history.type,
                    id: history.id,
                };
            })
            .sort((a: any, b: any) => {
                return new Date(b.otherProps?.updated_at).getTime() - new Date(a.otherProps?.updated_at).getTime();
            });
    }, [histories]);
    const showSelected = (value: IListItem) => {
        setSelectedHistory(value);
    };

    if (histories.length === 0) {
        return <Typography>{langPage.noHistory}</Typography>;
    }

    return (
        <>
            {selectedHistory && (
                <Modal
                    open
                    onClose={() => setSelectedHistory(null)}
                    withCloseButton
                    title={selectedHistory.title}
                    withOkButton
                    responsiveWidth
                >
                    {selectedHistory.otherProps?.type === "test" && (
                        <HistoryTestDetails
                            data={selectedHistory.otherProps as IMedicinePatientHistoryDto<IMedicinePatientTestDto>}
                            params={medicineParams || []}
                        />
                    )}
                </Modal>
            )}
            <List
                values={values}
                onSelectValue={showSelected}
            />
        </>
    );
}

function HistoryTestDetails({
    data,
    params,
}: {
    data: IMedicinePatientHistoryDto<IMedicinePatientTestDto>;
    params: IMedicineParam[];
}) {
    const langPage = lang.pages.medicine.history;
    const values = useMemo<IKeyValueListItem[]>(() => {
        const newValues: IKeyValueListItem[] = [
            {
                title: langPage.type,
                value: langPage.test,
            },
            {
                title: lang.status,
                value: getEnumTitleValue(MedicinePatientTestStatusEnum, "MedicinePatientTestStatusEnum", data.status),
            },
            {
                title: langPage.created_at,
                value: dateTime(data.created_at),
            },
        ];
        if (data.created_at !== data.updated_at) {
            newValues.push({
                title: langPage.updated_at,
                value: dateTime(data.updated_at),
            });
        }
        if (data.value?.test?.params?.length) {
            const paramList = data.value?.test?.params.map((param) => {
                const paramData = params.find((p) => p.id === param);
                return paramData?.title;
            });
            newValues.push({
                title: lang.pages.medicine.params.title,
                value: paramList?.join(","),
            });
        }
        if (data.value?.created_user) {
            newValues.push({
                title: langPage.created_user,
                value: <UserView user={data.value?.created_user} />,
            });
        }
        if (data.value?.status === MedicinePatientTestStatusEnum.Finished && data.value?.updated_user) {
            newValues.push({
                title: langPage.updated_user,
                value: <UserView user={data.value?.updated_user} />,
            });
        }

        return newValues;
    }, [data, params]);
    return (
        <KeyValueList
            withDivider
            values={values}
        />
    );
}
