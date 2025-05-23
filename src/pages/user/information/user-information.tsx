import { useUserInformationQuery } from "../../../store/api/api"
import { SummaryData } from "../../../components/user/information/summary_data"
import { Alert, Grid, Stack, Typography } from "@mui/material";
import { PersonalData } from "../../../components/user/information/personal_data";
import { useSelector } from "react-redux";

export const UserInformation = () => {

    const { email } = useSelector((state: any) => state.Auth.user)

    const { data, isLoading } = useUserInformationQuery(email)
    const userData = data ? data.data : null;
    console.log(data)

    if (isLoading) {
        return (
            <>
                cargando...
            </>
        )
    }

    return (
        <Stack spacing={3}>
            {
                !userData.verifiedAt &&
                <Alert severity='warning'>{<>Verifica tu cuenta mediante el correo enviado a <strong>{userData.email}</strong> recuerda verificar tu bandeja de no deseados o spam</>}</Alert>
            }
            <div>
                <Typography
                    variant='h4'
                >
                    Información personal
                </Typography>
            </div>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <SummaryData
                        props={userData}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                    <PersonalData
                        props={userData}
                    />
                </Grid>
            </Grid>
        </Stack>
    )
}