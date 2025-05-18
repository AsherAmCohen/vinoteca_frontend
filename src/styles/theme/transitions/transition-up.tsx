import { forwardRef, ReactElement, Ref } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { Slide } from '@mui/material';

const TransitionUp = forwardRef( function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>
    },
    ref: Ref<unknown>
) {
    return <Slide direction='up' ref={ ref } { ...props }/>
});

export default TransitionUp;