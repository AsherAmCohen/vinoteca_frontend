import { Avatar, Button, Card, CardActions, CardContent, Divider, Stack, Typography } from "@mui/material"
import { Password as PasswordIcon, UserCircle as UserIcon } from "@phosphor-icons/react"
import { useDispatch } from "react-redux";
import { SummaryDataEditPassword } from "./summary-data-edit-password";
import { openModalAction } from "../../../store/slice/UI/slice";

export const SummaryData = (props: any) => {
    const { name, lastname, email, phone } = props.props;
    const dispatch = useDispatch()

    // Abrir modal para cambiar la contraseña
    const handleChangePassword = () => {
        const payload = {
            title: `Cambiar contraseña`,
            component: SummaryDataEditPassword,
            args: email
        }
        dispatch(openModalAction(payload))
    }

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
                        <Typography color="text.secondary" variant='body2'>{email}</Typography>
                        <Typography color="text.secondary" variant='body2'>{phone}</Typography>
                    </Stack>
                </Stack>
            </CardContent>
            <Divider />
            <CardActions>
                <Button
                    startIcon={<PasswordIcon />}
                    fullWidth
                    variant='contained'
                    onClick={handleChangePassword}
                >
                    Cambiar contraseña
                </Button>
            </CardActions>
        </Card>
    )
}