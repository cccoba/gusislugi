import { useEffect } from "react";

import Modal from "components/Modal";
import { loaderHide, loaderShow } from "store/reducers/ComponentsSlice";

import { IPageOrModal } from "api/interfaces/components/Page/IPageOrModal";
import { useAppDispatch } from "api/hooks/redux";

import Page from ".";

function PageOrModal({ modalProps, isLoading = false, ...props }: IPageOrModal) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (isLoading) {
            dispatch(loaderShow());
        } else {
            dispatch(loaderHide());
        }
    }, [isLoading, dispatch]);
    if (modalProps) {
        return (
            <Modal
                open
                {...modalProps}
                title={props?.title || ""}
                children={props.children}
            />
        );
    }
    return <Page {...props} />;
}
export default PageOrModal;
