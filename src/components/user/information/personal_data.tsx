import { Avatar, Card, CardContent, Divider, Stack, Typography } from "@mui/material"
import { UserCircleGear as Icon } from "@phosphor-icons/react"

export const PersonalData = (props: any) => {
    const {name, lastname, gender, email, address, phone, birthdate} = props.props
    
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
                            <Divider/>

                            {/* Genero */}
                            <Typography variant='overline'>Genero</Typography>
                            <Typography>{gender}</Typography>
                            <Divider/>

                            {/* Telefono */}
                            <Typography variant='overline'>Número Telefonico</Typography>
                            <Typography>{phone}</Typography>
                            <Divider/>

                            {/* Correo electronico */}
                            <Typography variant='overline'>Correo electronico</Typography>
                            <Typography>{email}</Typography>
                            <Divider/>

                            {/* Domicilio */}
                            <Typography variant='overline'>Domicilio</Typography>
                            <Typography>{address}</Typography>
                            <Divider/>

                            {/* Fecha de nacimiendo */}
                            <Typography variant='overline'>Fecha de nacimiento</Typography>
                            <Typography>{birthdate}</Typography>
                            <Divider/>

                        </Stack>
                        <Avatar
                            sx={{
                                backgroundColor: 'var(--Vinoteca-Background-Dark)',
                                height: '56px',
                                width: '56px'
                            }}
                        >
                            <Icon fontSize="var(--Vinoteca-Icon-FontSize-lg)" />
                        </Avatar>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}