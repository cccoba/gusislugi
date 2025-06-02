import type { SxProps } from "@mui/material";
import { Typography, Card, CardHeader, CardContent } from "@mui/material";

interface IProps {
    title: string;
    desc: string;
    id: string;
    sx?: SxProps;
    questId?: number;
}
export default function MapPopup({ id, title = "", desc = "", sx = {}, questId = 0 }: IProps) {
    const infoModalClose = () => {
        //setActiveItem(null);
    };
    return (
        <>
            <Card
                id={id}
                sx={sx}
            >
                {!!title && (
                    <CardHeader
                        title={title}
                        sx={{
                            pb: 0,
                        }}
                    />
                )}
                {(!!desc || !!questId) && (
                    <CardContent sx={{ pb: 0 }}>
                        {!!desc && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 1 }}
                            >
                                {desc}
                            </Typography>
                        )}
                    </CardContent>
                )}
            </Card>
        </>
    );
}
