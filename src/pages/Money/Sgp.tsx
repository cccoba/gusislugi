import { useMemo, useState } from "react";
import { Box, Button } from "@mui/material";

import lang, { sprintf } from "lang";
import { Icon, Image, KeyValueList, Page } from "components";
import { IPage } from "api/interfaces/components/Page/IPage";
import getConst from "api/common/getConst";
import { IKeyValueListItem } from "components/KeyValueList";
import { useAppSelector } from "api/hooks/redux";
import MoneyUserHistory from "./UserHistory";

const langPage = lang.pages.money.sgp;

function MoneySgp({ icon }: IPage) {
    const [isLoading, setIsLoading] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    const userMoney = useAppSelector((s) => s.user.user?.money);
    const userId = useAppSelector((s) => s.user.user?.id);
    const values = useMemo(() => {
        const newValues: IKeyValueListItem[] = [];
        newValues.push({ title: langPage.fields.money, value: sprintf(lang.money, userMoney || 0) });
        return newValues;
    }, [userMoney]);
    const toShowHistory = () => {
        setShowHistory(true);
    };
    const hideHistory = () => {
        setShowHistory(false);
    };
    const toSend = () => {
        console.log("toSend");
    };

    return (
        <Page
            title={langPage.title}
            isLoading={isLoading}
            icon={icon}
        >
            {showHistory && (
                <MoneyUserHistory
                    userId={userId || 0}
                    modalProps={{ onClose: hideHistory, withCloseButton: true, responsiveWidth: true }}
                />
            )}
            <Box sx={{ display: "flex" }}>
                <Image
                    url={getConst("assets-images-path") + "sgp.png"}
                    width="150px"
                    height="150px"
                />
                <Box
                    flexGrow="5"
                    sx={{ ml: 2 }}
                >
                    <KeyValueList
                        withDivider
                        values={values}
                    />

                    <Button
                        variant="contained"
                        sx={{ my: 1 }}
                        startIcon={<Icon name="search" />}
                        color="inherit"
                        fullWidth
                        onClick={toShowHistory}
                    >
                        {langPage.history}
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Icon name="send" />}
                        fullWidth
                        onClick={toSend}
                    >
                        {langPage.send}
                    </Button>
                </Box>
            </Box>
        </Page>
    );
}
export default MoneySgp;
