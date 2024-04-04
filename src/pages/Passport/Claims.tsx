import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { getEnumValue } from "api/common/enumHelper";
import { ClaimStatusEnum } from "api/enums/ClaimStatusEnum";
import { UserRolesEnum } from "api/enums/UserRolesEnum";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";
import { IClaimDto } from "api/interfaces/user/IClaimDto";
import { GoodTable, Icon, RoleChecker } from "components";
import { IGoodTableField } from "components/GoodTable";
import lang, { getEnumTitle } from "lang";
import { useMemo } from "react";

interface IProps {
    claims: IClaimDto[];
}

const langPage = lang.pages.passport.claims;

const langClaims = lang.pages.profile.claims;
const fields: IGoodTableField[] = [
    { name: "id", title: langClaims.fields.id },
    { name: "title", title: langClaims.fields.title },
    { name: "status", title: langClaims.fields.status },
    { name: "date", title: langClaims.fields.updatedDate, format: "date", maxWidth: "120px" },
];
function PassportClaims({ claims }: IProps) {
    const values = useMemo(() => {
        if (claims?.length) {
            return claims.map((x) => ({
                id: x.id,
                title: x.title,
                status: getEnumTitle("ClaimStatusEnum", getEnumValue(ClaimStatusEnum, x.status) || ""),
                date: x.updated_at ? x.updated_at : x.created_at,
            }));
        }
        return [];
    }, [claims]);
    return (
        <RoleChecker roles={[UserRolesEnum.Claims]}>
            <Accordion>
                <AccordionSummary expandIcon={<Icon name="down" />}>
                    {langPage.title} ( {claims?.length} )
                </AccordionSummary>
                <AccordionDetails>
                    <GoodTable
                        fields={fields}
                        values={values}
                        order={{ direction: SortOrderEnum.Descending, sort: "id" }}
                    />
                </AccordionDetails>
            </Accordion>
        </RoleChecker>
    );
}
export default PassportClaims;
