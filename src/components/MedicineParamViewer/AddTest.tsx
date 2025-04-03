import Form from "components/Form";
import Modal from "components/Modal";
import lang from "lang";

interface IProps {
    onSelect: (testId?: number) => void;
}

export default function MedicineParamAddTest({ onSelect }: IProps) {
    const onClose = () => {
        onSelect();
    };
    const toSave = ({ testId }: { testId: number }) => {
        onSelect(testId);
    };
    return (
        <Modal
            open={true}
            onClose={onClose}
            title={lang.pages.medicine.params.add}
            responsiveWidth
            withCloseButton
        >
            <Form
                fields={[
                    {
                        name: "testId",
                        title: lang.pages.medicine.params.tests,
                        type: "medicineTest",
                        required: true,
                    },
                ]}
                values={{ testId: undefined }}
                onSubmit={toSave}
                onCancel={onClose}
                submitBtnText={lang.pages.medicine.params.add}
            />
        </Modal>
    );
}
