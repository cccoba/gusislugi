import { medicine } from "api/data";
import { MedicinePatientStatusEnum } from "api/enums/MedicinePatientStatusEnum";
import useLoadApiData from "api/hooks/useLoadApiData";
import { IPageOrModal } from "api/interfaces/components/Page/IPageOrModal";
import { IMedicineDiseases } from "api/interfaces/Medicine/IMedicineDiseases";
import { IMedicinePatient } from "api/interfaces/Medicine/IMedicinePatient";
import { IUserDto } from "api/interfaces/user/IUserDto";
import { Form, PageOrModal } from "components";
import lang, { getEnumSelectValues } from "lang";
import { useMemo } from "react";

interface IProps extends IPageOrModal {
    data: IMedicinePatient;
    onAdd: (data: IMedicinePatient) => void;
}

export default function MedicinePatientAdd({ data, modalProps, onAdd }: IProps) {
    const langPage = lang.pages.medicine.patients;
    const { data: diseases, isLoading } = useLoadApiData<IMedicineDiseases[]>(medicine.diseases.getAll, []);
    const diseaseList = useMemo(() => {
        if (diseases?.length) {
            return diseases?.map((disease) => ({
                id: disease.id,
                title: disease.title,
            }));
        }
        return [];
    }, [diseases]);
    console.log("diseaseList", diseaseList);

    return (
        <PageOrModal
            title={langPage.add}
            modalProps={modalProps}
            isLoading={isLoading}
        >
            <Form
                fields={[
                    { name: "userId", title: langPage.user, type: "user", required: true },
                    { name: "diseaseId", title: langPage.disease, type: "select", required: true, values: diseaseList },
                    {
                        name: "status",
                        title: langPage.status,
                        type: "list",
                        required: true,
                        values: getEnumSelectValues(MedicinePatientStatusEnum, "MedicinePatientStatusEnum"),
                    },
                ]}
                values={data}
                onCancel={modalProps?.onClose}
                onSubmit={onAdd}
            />
        </PageOrModal>
    );
}
