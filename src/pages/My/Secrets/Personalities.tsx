import { Typography } from "@mui/material";
import type { IPersonalityDto } from "api/interfaces/user/IPersonalityDto";
import type { IListItem } from "components";
import { List, Modal } from "components";
import lang from "lang";
import { useMemo, useState } from "react";

interface IProps {
    data: IPersonalityDto[];
}

export default function SecretsPersonalities({ data }: IProps) {
    const langPage = lang.pages.personalities;
    const [selectedValue, setSelectedValue] = useState<IPersonalityDto | null>(null);
    const values = useMemo<IListItem[]>(() => {
        return data.map((value, index) => ({
            id: index,
            subTitle: value.isCompleted ? langPage.isCompleted : undefined,
            title: value.title,
            otherProps: value,
        }));
    }, [data]);
    const onSelectValue = (value: IListItem) => {
        setSelectedValue(value.otherProps as IPersonalityDto);
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
                    <Typography whiteSpace="pre-wrap">{selectedValue.userDescription}</Typography>
                </Modal>
            )}
            <List
                values={values}
                onSelectValue={onSelectValue}
                label={langPage.title}
            />
        </>
    );
}
