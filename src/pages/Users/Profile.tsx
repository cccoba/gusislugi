import { useMemo, useState } from "react";

import lang from "lang";
import { Accordion, Page } from "components";
import { setUserData } from "store/reducers/UserSlice";

import { useAppDispatch, useAppSelector } from "api/hooks/redux";
import { IUserDto } from "api/interfaces/user/IUserDto";
import { users } from "api/data";
import { useNotifier } from "api/hooks/useNotifier";
import { webApiResultData } from "api/data/dataProvider";
import UserForm from "components/UserForm";

const langPage = lang.pages.profile;

function Profile() {
    const [isLoading, setIsLoading] = useState(false);
    const user = useAppSelector((x) => x.user.user);
    const { showError, showSuccess } = useNotifier();
    const dispatch = useAppDispatch();

    const accordionValues = useMemo(() => {
        if (user) {
            const values = [
                {
                    id: "userInfo",
                    title: langPage.userForm,
                    child: (
                        <UserForm
                            user={user}
                            isCurrent
                            onChangeValue={toSaveUser}
                        />
                    ),
                },
            ];
            return values;
        }
        return [];
    }, [user]);

    function toSaveUser(data: IUserDto) {
        setIsLoading(true);
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
        >
            {!!user && (
                <>
                    <Accordion
                        defaultActiveId="userInfo"
                        values={accordionValues}
                    />
                </>
            )}
        </Page>
    );
}
export default Profile;
