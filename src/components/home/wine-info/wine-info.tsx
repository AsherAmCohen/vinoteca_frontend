import { Button, DialogActions, DialogContent } from "@mui/material";

export const WineInfo = (props: any) => {
    const { id } = props.args;

    return (
        <>
            <DialogContent>
                {id}
            </DialogContent>
            <DialogActions>
                <Button variant='contained'>
                    Botones de accion
                </Button>
            </DialogActions>
        </>
    )
}