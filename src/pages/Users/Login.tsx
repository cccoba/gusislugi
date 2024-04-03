import { Typography, Box, Button, Link, Paper } from "@mui/material";
import getConst from "api/common/getConst";
import lang from "lang";

const langPage = lang.pages.login;

function Login() {
    return (
        <Box
            sx={{
                textAlign: "center",
                m: 2,
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 5,
                }}
            >
                <Typography sx={{ mb: 3 }}>{langPage.text}</Typography>
                <Button
                    component={Link}
                    variant="contained"
                    href={"https://t.me/" + getConst("bot-name")}
                >
                    {langPage.toBot}
                </Button>
            </Paper>
        </Box>
    );
}

export default Login;
