import { useState } from "react";

import lang from "lang";
import { Page } from "components";
import { setUserData } from "store/reducers/UserSlice";
import UserForm from "components/UserForm";

import { useAppDispatch, useAppSelector } from "api/hooks/redux";
import { IUserDto } from "api/interfaces/user/IUserDto";
import { users } from "api/data";
import { useNotifier } from "api/hooks/useNotifier";
import { webApiResultData } from "api/data/dataProvider";

const langPage = lang.pages.profile;

function Profile() {
    const [isLoading, setIsLoading] = useState(false);
    const user = useAppSelector((x) => x.user.user);
    const { showError, showSuccess } = useNotifier();
    const dispatch = useAppDispatch();

    function toSaveUser(data: IUserDto) {
        setIsLoading(true);
        if (!data.image) {
            data.image = "";
        }
        users
            .updateUser(data)
            .then((res) => {
                const { error, result } = webApiResultData<IUserDto>(res);
                if (error) {
                    throw error;
                }
                if (result) {
                    dispatch(setUserData(result));
                    showSuccess(langPage.success.updateUser);
                }
            })
            .catch((err) => {
                showError(err?.name === "webApiResultError" ? err.message : langPage.errors.updateUser);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    return (
        <Page
            title={langPage.title}
            isLoading={isLoading}
            icon="person_pin"
            backUrl={"/"}
        >
            {!!user && (
                <UserForm
                    user={user}
                    onChangeValue={toSaveUser}
                />
            )}
        </Page>
    );
}
export default Profile;
