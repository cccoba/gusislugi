import type { IMedicalSicknessDto } from "api/interfaces/user/IMedicalSicknessDto";
import type { IListItem } from "components";
import { List, Modal, ParsedHtml } from "components";
import lang from "lang";
import { useMemo, useState } from "react";

interface IProps {
    data: IMedicalSicknessDto[];
}

export default function SecretsMedicalInfo({ data }: IProps) {
    const langPage = lang.pages.secrets.medicalInfo;
    const [selectedValue, setSelectedValue] = useState<IMedicalSicknessDto | null>(null);
    const values = useMemo<IListItem[]>(() => {
        return data.map((value, index) => ({
            id: index,
            title: value.title,
            otherProps: value,
        }));
    }, [data]);
    const onSelectValue = (value: IListItem) => {
        setSelectedValue(value.otherProps as IMedicalSicknessDto);
    };
    const hideModal = () => {
        setSelectedValue(null);
    };
    return (
        <>
            {!!selectedValue && (
                <Modal
                    open
                    withCloseButton
                    withOkButton
                    title={selectedValue.title}
                    responsiveWidth
                    onClose={hideModal}
                >
                    <ParsedHtml html={selectedValue.userDescription} />
                </Modal>
            )}
            <List
                values={values}
                onSelectValue={onSelectValue}
                label={langPage.label}
            />
        </>
    );
}
