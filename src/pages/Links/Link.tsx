import { Box, Typography } from "@mui/material";
import { links, webApiResultData } from "api/data";
import { useNotifier } from "api/hooks/useNotifier";
import useParamsId from "api/hooks/useParamsId";
import { IPageOrModal } from "api/interfaces/components/Page/IPageOrModal";
import { ILinkDto } from "api/interfaces/user/ILinkDto";
import { PageOrModal, RawHtml } from "components";
import lang from "lang";
import { useEffect, useState } from "react";

interface IProps extends IPageOrModal {
    link?: ILinkDto;
}

const langPage = lang.pages.links;

function LinksLink({ link, backUrl, icon, modalProps }: IProps) {
    const [data, setData] = useState<null | ILinkDto>(null);
    const [isLoading, setIsLoading] = useState(false);
    const linkId = useParamsId();
    const { showError } = useNotifier();
    useEffect(() => {
        if (link) {
            setData(link);
            return;
        }
        if (linkId) {
            setIsLoading(true);
            links
                .getLink(linkId)
                .then((res) => {
                    const { error, result } = webApiResultData<ILinkDto>(res);
                    if (error) {
                        throw error;
                    }
                    if (result) {
                        setData(result);
                    }
                })
                .catch((err) => {
                    showError(err?.name === "webApiResultError" ? err.message : langPage.errors.getLink);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [linkId, link]);
    if (!data) {
        return null;
    }
    return (
        <PageOrModal
            title={data?.title}
            icon={icon}
            backUrl={backUrl}
            modalProps={modalProps}
            isLoading={isLoading}
        >
            <Box
                sx={{
                    "& ol": {
                        counterReset: "item",
                        listStyleType: "none",
                    },
                    "& ol > li": {
                        counterIncrement: "item",
                    },

                    "& ol > li:before": {
                        content: 'counters(item, ".") ". "',
                    },

                    "& ol ol > li:before": {
                        content: 'counters(item, ".") " "',
                    },
                }}
            >
                <RawHtml html={data.description} />
            </Box>
        </PageOrModal>
    );
}
export default LinksLink;
