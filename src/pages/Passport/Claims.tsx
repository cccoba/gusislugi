import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { GoodTable, Icon, RoleChecker } from "components";
import { IGoodTableField } from "components/GoodTable";
import lang, { getEnumTitle } from "lang";

import { getEnumValue } from "api/common/enumHelper";
import { ClaimStatusEnum } from "api/enums/ClaimStatusEnum";
import { RolePermissionFlag } from "api/enums/RolePermissionFlag";
import { SortOrderEnum } from "api/interfaces/components/GoodTable";
import { IClaimDto } from "api/interfaces/user/IClaimDto";

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
    const navigate = useNavigate();
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
    const toClaim = (data: any) => {
        navigate(`/claims/${data.id}`);
    };
    return (
        <RoleChecker roles={[["claims"]]}>
            <Accordion>
                <AccordionSummary expandIcon={<Icon name="down" />}>
                    {langPage.title} ( {claims?.length} )
                </AccordionSummary>
                <AccordionDetails>
                    <GoodTable
                        fields={fields}
                        values={values}
                        order={{ direction: SortOrderEnum.Descending, sort: "id" }}
                        onRowClick={toClaim}
                    />
                </AccordionDetails>
            </Accordion>
        </RoleChecker>
    );
}
export default PassportClaims;
