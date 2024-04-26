import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

import lang, { sprintf } from "lang";
import { Icon, IconButton, Image, Page } from "components";
import { setMoney } from "store/reducers/UserSlice";

import { IPage } from "api/interfaces/components/Page/IPage";
import getConst from "api/common/getConst";
import { useAppDispatch, useAppSelector } from "api/hooks/redux";
import { money, webApiResultData } from "api/data";

import MoneyUserHistory from "./UserHistory/UserHistory";
import MoneyUserSend from "./UserSend";

const langPage = lang.pages.money.sgp;

function MoneySgp({ icon }: IPage) {
    const [showHistory, setShowHistory] = useState(false);
    const [showSend, setShowSend] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    useEffect(() => {
        loadMoneyCount();
    }, []);
    const currentUserMoney = useAppSelector((s) => s.user.user?.money);
    function loadMoneyCount() {
        setIsLoading(true);
        money
            .getValue()
            .then((res) => {
                const { error, result } = webApiResultData<number>(res);
                if (error) {
                    throw error;
                }
                if (result) {
                    dispatch(setMoney(result));
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    const toShowHistory = () => {
        setShowHistory(true);
    };
    const hideHistory = () => {
        setShowHistory(false);
    };
    const toSend = () => {
        setShowSend(true);
    };
    const hideSend = () => {
        setShowSend(false);
    };

    return (
        <Page
            title={langPage.title}
            icon={icon}
            isLoading={isLoading}
            backUrl={"/"}
        >
            {showHistory && (
                <MoneyUserHistory modalProps={{ onClose: hideHistory, withCloseButton: true, responsiveWidth: true }} />
            )}
            {showSend && (
                <MoneyUserSend modalProps={{ onClose: hideSend, withCloseButton: true, responsiveWidth: true }} />
            )}
            <Box sx={{ display: "flex" }}>
                <Image
                    url={getConst("assets-images-path") + "sgp.png"}
                    width="100px"
                    height="100px"
                    alt={langPage.sgp}
                />
                <Box
                    flexGrow="5"
                    sx={{ ml: 2 }}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexWrap="wrap"
                    >
                        <Typography>{langPage.fields.money} : </Typography>
                        <Typography variant="h4">{sprintf(lang.money, currentUserMoney || 0)} </Typography>
                        <IconButton
                            name="update"
                            color="primary"
                            onClick={loadMoneyCount}
                        />
                    </Box>
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
                        disabled={!currentUserMoney}
                    >
                        {langPage.send}
                    </Button>
                </Box>
            </Box>
        </Page>
    );
}
export default MoneySgp;
