import { Fragment, useMemo, useState } from "react";
import { Box, List, Divider, Button, Link as MuiLink } from "@mui/material";

import lang from "lang";
import { Fieldset, Icon, Link, LinkButton, Page } from "components";

import { IPage } from "api/interfaces/components/Page/IPage";
import { links } from "api/data";
import { ILinkDto } from "api/interfaces/user/ILinkDto";
import useLoadApiData from "api/hooks/useLoadApiData";
import { ILinkCategoryDto } from "api/interfaces/user/ILinkCategoryDto";
import getConst from "api/common/getConst";
import { useAppSelector } from "api/hooks/redux";

import LinksLink from "./Link";

const langPage = lang.pages.links;

function Links({ backUrl, icon }: IPage) {
    const [activeLink, setActiveLink] = useState<null | ILinkDto>(null);
    const { data, isLoading } = useLoadApiData<ILinkCategoryDto[]>(links.getLinks, []);
    const currentRoleId = useAppSelector((s) => s.user.user?.roleId);
    const result = useMemo(() => {
        if (data?.length) {
            return data.filter((x) => {
                if (!!x.links.length) {
                    if (x.roles?.length) {
                        const roleList = x.roles.split(",");
                        return roleList.includes((currentRoleId || 1).toString());
                    }
                    return true;
                }
                return false;
            });
        }
        return [];
    }, [data, currentRoleId]);
    const toShowDetails = (e: any, link: ILinkDto) => {
        e.stopPropagation();
        e.preventDefault();
        setActiveLink(link);
    };
    const hideDetails = () => {
        setActiveLink(null);
    };
    const toDownload = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        (window as any).open(e.target.href, "_blank");
    };
    return (
        <Page
            title={langPage.title}
            isLoading={isLoading}
            icon={icon}
            backUrl={"/"}
        >
            {!!activeLink && (
                <LinksLink
                    link={activeLink}
                    modalProps={{
                        withCloseButton: true,
                        onClose: hideDetails,
                        responsiveWidth: true,
                        actions: [<Button onClick={hideDetails}>{lang.ok}</Button>],
                    }}
                />
            )}
            <Fieldset label={langPage.helpTitle}>
                <MuiLink
                    href="https://teleport-games.ru/gusislugi_site/help/"
                    target="_blank"
                    rel="noreferrer"
                >
                    {langPage.help}
                </MuiLink>
            </Fieldset>
            {result?.map((x) => (
                <Fieldset
                    label={x.title}
                    key={x.id}
                >
                    <List
                        disablePadding
                        component="div"
                    >
                        {x.links.map((link, index) => (
                            <Fragment key={link.id}>
                                {!!index && <Divider />}
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Box>
                                        <Link
                                            url={backUrl + "/" + link.id}
                                            onClick={(e) => toShowDetails(e, link)}
                                        >
                                            {link.title}
                                        </Link>
                                    </Box>
                                    {!!link.filename && (
                                        <LinkButton
                                            variant="contained"
                                            startIcon={<Icon name="download" />}
                                            url={getConst("dock-url") + link.filename}
                                            sx={{ mx: 2, minWidth: "120px", maxWidth: "120px" }}
                                            onClick={toDownload}
                                        >
                                            {langPage.download}
                                        </LinkButton>
                                    )}
                                </Box>
                            </Fragment>
                        ))}
                    </List>
                </Fieldset>
            ))}
        </Page>
    );
}
export default Links;
