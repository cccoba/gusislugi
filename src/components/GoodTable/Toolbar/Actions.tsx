import { Box, ButtonGroup, Divider } from "@mui/material";
import type { ReactNode } from "react";
import { Fragment } from "react";

import IconButton from "components/Icon/IconButton";
import lang from "lang";

import type { IGoodTableToolbarAction } from "..";

interface IProps<T> {
    selectedRows: T[];
    actions?: (IGoodTableToolbarAction<T> | ReactNode)[];
    isMobileView: boolean;
    csvExport?: string;
    onCsvExportClick?: () => void;
}

export default function GoodTableToolbarActions<T>({
    actions = [],
    selectedRows = [],
    isMobileView,
    csvExport,
    onCsvExportClick,
}: IProps<T>) {
    const onClick = (actionName: string) => {
        if (actions?.length) {
            const action = actions.find((x) => (x as any)?.name === actionName) as any;
            if (typeof action?.onClick == "function") {
                action.onClick(selectedRows);
            }
        }
    };
    if (isMobileView) {
        return (
            <Box sx={{ position: "fixed", bottom: 3, right: 0, zIndex: 100 }}>
                <ButtonGroup
                    orientation="horizontal"
                    variant="contained"
                    sx={{ bgcolor: "primary.contrastText", borderRadius: "4px 0px 0px 4px" }}
                >
                    {actions.map((action: any, index) => {
                        return (
                            <Fragment key={index}>
                                {!!index && (
                                    <Divider
                                        orientation="vertical"
                                        variant="fullWidth"
                                        flexItem
                                    />
                                )}
                                {typeof action?.name !== "undefined" ? (
                                    <IconButton
                                        name={action.icon}
                                        onClick={() => onClick(action.name)}
                                        color={action?.color || "primary"}
                                        disabled={action?.disable ? action.disable(selectedRows) : false}
                                        tooltip={action?.tooltip}
                                        size="large"
                                    />
                                ) : (
                                    action
                                )}
                            </Fragment>
                        );
                    })}
                    {!!csvExport && <GoodTableToolbarActionExportCsv onClick={onCsvExportClick} />}
                </ButtonGroup>
            </Box>
        );
    }
    return (
        <>
            {(!!actions?.length || !!csvExport) && (
                <Box
                    sx={{
                        justifyContent: "flex-end",
                        flexGrow: 1,
                        display: "flex",
                        flexWrap: "wrap",
                    }}
                    className="GoodTableToolbarActions"
                >
                    {actions.map((action: any, index) =>
                        typeof action?.name !== "undefined" ? (
                            <IconButton
                                key={index}
                                name={action.icon}
                                onClick={() => onClick(action.name)}
                                color={action?.color || "primary"}
                                disabled={action?.disable ? action.disable(selectedRows) : false}
                                tooltip={action?.tooltip}
                            />
                        ) : (
                            action
                        )
                    )}
                    {!!csvExport && <GoodTableToolbarActionExportCsv onClick={onCsvExportClick} />}
                </Box>
            )}
        </>
    );
}
interface IGoodTableToolbarActionExportCsvProps {
    onClick?: () => void;
}
function GoodTableToolbarActionExportCsv({ onClick }: IGoodTableToolbarActionExportCsvProps) {
    return (
        <IconButton
            name="download"
            onClick={onClick}
            color="primary"
            tooltip={lang.components.goodTable.toolbar.csvExport}
        />
    );
}
