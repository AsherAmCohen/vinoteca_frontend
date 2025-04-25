import { Button, Grid, Stack, Typography } from "@mui/material"
import { Pencil as EditIcon } from "@phosphor-icons/react"
import { PersonalData } from "../../../components/user/information/personal_data"
import { useUserInformationQuery } from "../../../store/api/api"

export const UserInformation = () => {
    const {data, isLoading} = useUserInformationQuery('PabloVazquezReyes@outlook.com')
    const user = data ? data.data : null;

    if(isLoading) {
        return (
            <>
                cargando...
            </>
        )
    }

    return (
        <Stack spacing={3}>
            <Stack
                direction='row'
                spacing={3}
            >
                <Stack
                    spacing={1}
                    sx={{
                        flex: '1 1 auto'
                    }}
                >
                    <Typography
                        variant="h4"
                    >
                        Información personal
                    </Typography>
                </Stack>
                <Button
                    color='primary'
                    variant='contained'
                    startIcon={<EditIcon fontSize="var(--Vinoteca-Icon-FontSize-md)" />}
                >
                    Editar información
                </Button>
            </Stack>

            <Grid container spacing={3}>
                <Grid size={{ xs: 6, md: 7 }}>
                    <PersonalData 
                        props={user}
                    />
                </Grid>

                <Grid size={{ xs: 6, md: 5 }}>
                    <PersonalData 
                        props={user}
                    />
                </Grid>
            </Grid>
        </Stack>
    )
}