import { useEffect, useState } from "react";

import { Alert, Page } from "components";
import UserForm from "components/UserForm";
import lang from "lang";

import { users, webApiResultData } from "api/data";
import { useNotifier } from "api/hooks/useNotifier";
import useParamsId from "api/hooks/useParamsId";
import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { IUserDto } from "api/interfaces/user/IUserDto";

const langPage = lang.pages.users;

function User({ roles }: IPageWithRoles) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [user, setUser] = useState<IUserDto | null>(null);
    const userId = useParamsId();
    const { showSuccess } = useNotifier();
    useEffect(() => {
        if (userId) {
            setIsLoading(true);
            users
                .getUser(userId)
                .then((res) => {
                    const { error, result } = webApiResultData<IUserDto>(res);
                    if (error) {
                        throw error;
                    }
                    if (result) {
                        setUser(result);
                    }
                })
                .catch((err) => {
                    setError(err?.name === "webApiResultError" ? err.message : langPage.errors.getUser);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [userId]);
    const toSaveUser = (data: any) => {
        setIsLoading(true);
        users
            .updateUser(data)
            .then((res) => {
                const { error, result } = webApiResultData<any>(res);
                if (error) {
                    throw error;
                }
                if (result) {
                    showSuccess(langPage.success.updateUser);
                }
            })
            .catch((err) => {
                setError(err?.name === "webApiResultError" ? err.message : langPage.errors.updateUser);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    return (
        <Page
            title={langPage.title}
            isLoading={isLoading}
            roles={roles}
            icon="user"
            backUrl="/users"
        >
            {!!error ? (
                <Alert
                    type="error"
                    text={error}
                />
            ) : (
                <>
                    {!!user && (
                        <UserForm
                            user={user}
                            onChangeValue={toSaveUser}
                        />
                    )}
                </>
            )}
        </Page>
    );
}
export default User;
