import { Avatar, Button, Card, CardActions, CardContent, Divider, Stack, Typography } from "@mui/material"
import { Password as PasswordIcon, UserCircle as UserIcon } from "@phosphor-icons/react"

export const SummaryData = (props: any) => {
    const { name, lastname, email, phone } = props.props;

    return (
        <Card>
            <CardContent>
                <Stack
                    spacing={2}
                    sx={{
                        alignItems: 'center'
                    }}
                >
                    <div>
                        <Avatar
                            sx={{
                                height: '80px',
                                width: '80px',
                                color: 'var(--Vinoteca-Background-Light)',
                                bgcolor: 'var(--Vinoteca-Background-Dark)'
                            }}
                        >
                            <UserIcon
                                fontSize='70px'
                            />
                        </Avatar>
                    </div>
                    <Stack spacing={1} sx={{ textAlign: 'center' }}>
                        <Typography variant="h5">{name} {lastname}</Typography>
                        <Typography variant='body2'>{email}</Typography>
                        <Typography variant='body2'>{phone}</Typography>
                    </Stack>
                </Stack>
            </CardContent>
            <Divider />
            <CardActions>
                <Button startIcon={<PasswordIcon/>} fullWidth variant='contained'>Cambiar contraseña</Button>
            </CardActions>
        </Card>
    )
}