import { Button, Card, CardActions, CardContent, Divider, Stack, Typography } from "@mui/material"
import { PencilLine as EditIcon } from "@phosphor-icons/react";
import { PersonalDataEdit } from "./personal-data-edit";
import { useDispatch } from "react-redux";
import { openModalAction } from "../../../store/slice/UI/slice";

export const PersonalData = (props: any) => {
    const { name, lastname, gender, email, address, phone, birthdate } = props.props
    const dispatch = useDispatch()

    // Abrir modal para cambiar la información del usuario
    const handleChangeUserData = () => {
        const payload = {
            title: `Cambiar información`,
            component: PersonalDataEdit,
            args: { name, lastname, address, phone, email }
        }
        dispatch(openModalAction(payload))
    }

    return (
        <Card
            sx={{
                height: '100%'
            }}
        >
            <CardContent>
                <Stack spacing={3}>
                    <Stack
                        direction='row'
                        sx={{
                            alignItems: 'flex-start',
                            justifyContent: 'space-between'
                        }}
                        spacing={3}
                    >
                        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
                            <Typography variant='overline'>Datos Personales</Typography>

                            {/* Nombre */}
                            <Typography variant='overline'>Nombre</Typography>
                            <Typography>{name}</Typography>
                            <Divider />

                            {/* Apellidos */}
                            <Typography variant='overline'>Apellidos</Typography>
                            <Typography>{lastname}</Typography>
                            <Divider />

                            {/* Genero */}
                            <Typography variant='overline'>Genero</Typography>
                            <Typography>{gender}</Typography>
                            <Divider />

                            {/* Telefono */}
                            <Typography variant='overline'>Número Telefonico</Typography>
                            <Typography>{phone}</Typography>
                            <Divider />

                            {/* Correo electronico */}
                            <Typography variant='overline'>Correo electronico</Typography>
                            <Typography>{email}</Typography>
                            <Divider />

                            {/* Domicilio */}
                            <Typography variant='overline'>Domicilio</Typography>
                            <Typography>{address}</Typography>
                            <Divider />

                            {/* Fecha de nacimiendo */}
                            <Typography variant='overline'>Fecha de nacimiento</Typography>
                            <Typography>{birthdate}</Typography>
                            <Divider />

                        </Stack>
                    </Stack>
                </Stack>
            </CardContent>
            <Divider />
            <CardActions>
                <Button
                    startIcon={<EditIcon />}
                    fullWidth
                    variant='contained'
                    onClick={handleChangeUserData}
                >
                    Editar datos
                </Button>
            </CardActions>
        </Card>
    )
}