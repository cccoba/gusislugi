import { useEffect, useMemo, useState } from "react";

import lang from "lang";
import { GoodTable, Page, Switcher } from "components";
import { IPageWithRoles } from "api/interfaces/components/Page/IPageWithRoles";
import { IGoodTableField } from "components/GoodTable";
import { useAppSelector } from "api/hooks/redux";
import { users } from "api/data";
import useLoadApiData from "api/hooks/useLoadApiData";
import { IUserDto } from "api/interfaces/user/IUserDto";
import { useNotifier } from "api/hooks/useNotifier";
import Passport from "pages/Passport";

const langPage = lang.pages.users;
const defFields: IGoodTableField[] = [
    {
        name: "image",
        title: langPage.fields.image,
        format: "image",
        noSort: true,
        maxWidth: "30px",
        formatProps: { width: "32px" },
    },
    { name: "firstName", title: langPage.fields.firstName },
    { name: "nationalityId", title: langPage.fields.nationalityId, format: "list" },
    { name: "citizenshipId", title: langPage.fields.citizenshipId, format: "list" },
    { name: "tgLogin", title: "", hidden: true },
    { name: "passport", title: "", hidden: true },
];
function Persons({ roles, icon }: IPageWithRoles) {
    const [withImage, setWithImage] = useState(false);
    const [selectedUer, setSelectedUser] = useState<IUserDto | null>(null);
    const nationalities = useAppSelector((x) => x.user.nationalities);
    const citizenships = useAppSelector((x) => x.user.citizenships);
    const { data, isLoading, error, refetch } = useLoadApiData<IUserDto[]>(users.getPersons, []);
    const { showError } = useNotifier();
    useEffect(() => {
        if (error) {
            showError(error);
        }
    }, [error]);
    const fields = useMemo(() => {
        let newFields = [...defFields];
        if (!withImage) {
            newFields = newFields.filter((x) => x.name !== "image");
        }
        const nationalityId = newFields.find((x) => x.name === "nationalityId");
        if (nationalityId) {
            nationalityId.formatProps = nationalities;
        }

        const citizenshipId = newFields.find((x) => x.name === "citizenshipId");
        if (citizenshipId) {
            citizenshipId.formatProps = citizenships;
        }
        return newFields;
    }, [nationalities, citizenships, withImage]);
    const toPassport = (data: any) => {
        setSelectedUser(!!data ? data : null);
    };
    const hidePassport = () => {
        setSelectedUser(null);
    };
    return (
        <Page
            roles={roles}
            icon={icon}
            title={langPage.title}
            isLoading={isLoading}
        >
            {!!selectedUer && (
                <Passport
                    idName="guid"
                    userGuid={selectedUer.guid}
                    roles={[["qr"]]}
                    icon="badge"
                    modalProps={{
                        withCloseButton: true,
                        onClose: hidePassport,
                        responsiveWidth: true,
                    }}
                />
            )}
            <Switcher
                value={withImage}
                onChangeValue={setWithImage}
                textValue={langPage.withImage}
            />
            <GoodTable
                fields={fields}
                values={data || []}
                actions={[{ name: "refresh", icon: "refresh", onClick: refetch }]}
                onRowClick={toPassport}
            />
        </Page>
    );
}
export default Persons;
