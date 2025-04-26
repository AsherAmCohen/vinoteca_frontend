import { useUserInformationQuery } from "../../../store/api/api"
import { SummaryData } from "../../../components/user/information/summary_data"
import { Grid, Stack, Typography } from "@mui/material";
import { PersonalData } from "../../../components/user/information/personal_data";

export const UserInformation = () => {
    const { data, isLoading } = useUserInformationQuery('PabloVazquezReyes@outlook.com')
    const user = data ? data.data : null;

    if (isLoading) {
        return (
            <>
                cargando...
            </>
        )
    }

    return (
        <Stack spacing={3}>
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
                        props={user}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                    <PersonalData
                        props={user}
                    />
                </Grid>
            </Grid>
        </Stack>
    )
}