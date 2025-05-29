import { forwardRef } from "react";
import { IMaskInput } from "react-imask";

interface Props {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

export const PhoneMask = forwardRef<HTMLInputElement, Props>(
    function TextMask(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask='#00 00 00 00'
                definitions={{
                    '#': /[1-9]/
                }}
                inputRef={ref}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
            />
        )
    }
)

export const StockMask = forwardRef<HTMLInputElement, Props>(
    function TextMask(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask={Number}
                scale={0}
                inputRef={ref}
            />
        )
    }
)