import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

import lang, { getEnumSelectValues } from "lang";
import { GoodTable, Page } from "components";

import { medicine, webApiResultData } from "api/data";
import { IPage } from "api/interfaces/components/Page/IPage";
import useLoadApiData from "api/hooks/useLoadApiData";
import { IMedicinePatient } from "api/interfaces/Medicine/IMedicinePatient";
import { MedicinePatientStatusEnum } from "api/enums/MedicinePatientStatusEnum";
import { useNotifier } from "api/hooks/useNotifier";
import { useLoader } from "api/hooks/redux";

import MedicinePatientAdd from "./Add";

export default function MedicinePatientList({ ...pageProps }: IPage) {
    const langPage = lang.pages.medicine.patients;
    const [addUser, setAddUser] = useState<IMedicinePatient | null>(null);
    const { data, isLoading, error, refetch } = useLoadApiData<IMedicinePatient[]>(medicine.patients.users, []);
    const { setIsLoading } = useLoader();
    const navigate = useNavigate();
    const { showError } = useNotifier();
    const showAdd = () => {
        setAddUser({
            id: 0,
            userId: 0,
            diseaseId: 0,
            status: MedicinePatientStatusEnum.Waiting,
        });
    };
    const values = useMemo(() => {
        return (data || []).map((item) => ({
            ...item,
            userName: item.user?.firstName,
            diseaseName: item.disease?.title,
        }));
    }, [data]);
    const hideUser = () => {
        setAddUser(null);
    };
    const toAdd = (data: IMedicinePatient) => {
        setIsLoading(true);
        medicine.patients
            .save(data)
            .then((res) => {
                const { error, result } = webApiResultData<IMedicinePatient>(res);
                if (error) {
                    throw error;
                }
                if (result) {
                    console.log("res", result);
                }
            })
            .catch((err) => {
                showError(err?.name === "webApiResultError" ? err.message : langPage.errors.add);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    const showEdit = (data: IMedicinePatient) => {
        navigate(`${data.userId}`);
    };
    return (
        <Page
            {...pageProps}
            title={langPage.title}
        >
            {!!addUser && (
                <MedicinePatientAdd
                    data={addUser}
                    onAdd={toAdd}
                    modalProps={{
                        withCloseButton: true,
                        onClose: hideUser,
                        responsiveWidth: true,
                    }}
                />
            )}
            <GoodTable
                values={values}
                loading={isLoading}
                fields={[
                    {
                        name: "id",
                        title: lang.id,
                    },
                    {
                        name: "userName",
                        title: langPage.user,
                    },
                    {
                        name: "diseaseName",
                        title: langPage.disease,
                    },
                    {
                        name: "status",
                        title: langPage.status,
                        format: "list",
                        formatProps: getEnumSelectValues(MedicinePatientStatusEnum, "MedicinePatientStatusEnum"),
                    },
                ]}
                onRowDoubleClick={showEdit}
                actions={[
                    { name: "refresh", icon: "refresh", onClick: refetch },
                    {
                        name: "add",
                        icon: "add",
                        onClick: showAdd,
                    },
                    {
                        name: "edit",
                        icon: "edit",
                        onClick: ([selectedRow]) => showEdit(selectedRow),
                        disable: (selectedRows) => selectedRows.length !== 1,
                    },
                ]}
            />
        </Page>
    );
}
