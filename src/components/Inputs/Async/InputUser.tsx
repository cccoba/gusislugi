import { useMemo, useState } from "react";
import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material";

import { users, webApiResultData } from "api/data";
import { useNotifier } from "api/hooks/useNotifier";
import type { IUserShortDto } from "api/interfaces/user/IUserShortDto";

import Icon from "components/Icon";
import IconButton from "components/Icon/IconButton";
import Loader from "components/Loader";
import QrScanner, { qrResultParser } from "components/QrScanner";
import lang from "lang";

interface IProps {
    label?: string;
    onSelectUser: (newValue: IUserShortDto) => void;
    fullWidth?: boolean;
    error?: boolean;
    required?: boolean;
    helperText?: string;
    disabled?: boolean;
    variant?: "filled" | "outlined" | "standard";
    withScan?: boolean;
}

export default function InputUser({
    withScan = false,
    onSelectUser,
    fullWidth = true,
    variant = "standard",
    ...props
}: IProps) {
    const langPage = lang.components.inputUser;
    const [search, setSearch] = useState("");
    const [showScaner, setShowScaner] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { showError } = useNotifier();
    const InputProps = useMemo(() => {
        if (withScan) {
            return {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            name="qrScanner"
                            onClick={toShowScan}
                            color="primary"
                        />
                    </InputAdornment>
                ),
            };
        }
        return undefined;
    }, [withScan]);
    function toShowScan() {
        setShowScaner(true);
    }
    const toHideScan = () => {
        setShowScaner(false);
    };
    const toChange = (e: any) => {
        const newValue = e.target.value;
        setSearch(newValue);
    };
    const toScanerResult = (message: string) => {
        toHideScan();
        const result = qrResultParser(message);
        switch (result.type) {
            case "guid":
            case "telegram":
                searchByText(result.value, result.type);
                break;
            default:
                showError(langPage.errors.scanerFormat);
        }
    };
    const startSearch = () => {
        if (search.length) {
            searchByText(search);
        }
    };
    const searchByText = (text: string, type: "telegram" | "guid" = "telegram") => {
        setIsLoading(true);
        const cb = type === "telegram" ? users.getUserByName : users.getUserByGuid;
        cb(text)
            .then((res) => {
                const { error, result } = webApiResultData<IUserShortDto>(res);
                if (error) {
                    throw error;
                }
                if (result) {
                    onSelectUser(result);
                }
            })
            .catch((err) => {
                showError(err?.name === "webApiResultError" ? err.message : langPage.errors.searchByName);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    return (
        <>
            <Loader isLoading={isLoading} />
            {!!showScaner && (
                <QrScanner
                    onCancel={toHideScan}
                    onRead={toScanerResult}
                />
            )}
            <Box display="flex">
                <Box flexGrow="5">
                    <TextField
                        onChange={toChange}
                        value={search}
                        fullWidth={fullWidth}
                        variant={variant}
                        autoFocus
                        InputProps={InputProps}
                        {...props}
                    />
                    <Typography variant="caption">{langPage.userSelect}</Typography>
                </Box>
                <Box sx={{ ml: 1 }}>
                    <Button
                        variant="contained"
                        startIcon={<Icon name="search" />}
                        sx={{ height: "100%" }}
                        onClick={startSearch}
                        disabled={!search.length}
                    >
                        {lang.search}
                    </Button>
                </Box>
            </Box>
        </>
    );
}
