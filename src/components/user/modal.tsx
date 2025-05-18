import { Dialog, DialogTitle } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { closeModalAction } from "../../store/slice/UI/slice"
import TransitionUp from "../../styles/theme/transitions/transition-up"

export const Modal = () => {
    const dispath = useDispatch()
    const { open, title, component: Cmp, args } = useSelector((state: any) => state.UI.Modal)

    const handleClose = () => {
        dispath(closeModalAction())
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={TransitionUp}
            sx={{
                '& .MuiDialog-container': {
                    '& .MuiPaper-root': {
                        width: '100%',
                        maxWidth: 'md'
                    }
                }
            }}
        >
            <DialogTitle>{title}</DialogTitle>
            {
                Cmp && <Cmp args={args} />
            }
        </Dialog>
    )
}