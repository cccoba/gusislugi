import React, { useState } from "react"
import { InputAdornment, IconButton, TextField, StandardTextFieldProps } from "@mui/material";

import Icon from '../Icon'
interface IProps extends StandardTextFieldProps {
    show?: boolean,
    onChangeValue?: (data: string) => void,

}
export default function InputPassword({ onChangeValue, show, ...props }: IProps) {
    const [stateShow, setShow] = useState(!!show);
    const onChange = (data: string) => {
        if (!!onChangeValue) {
            onChangeValue(data);
        }
    }
    const showPasswordChange = () => {
        setShow(!stateShow);
    }
    return (
        <TextField
            {...props}
            onChange={(e) => onChange(e.target.value)}
            InputProps={{
                endAdornment: (<InputAdornment position="end">
                    <IconButton edge="end" onClick={() => showPasswordChange()}>
                        <Icon name={!stateShow ? 'show' : 'hide'} />
                    </IconButton>
                </InputAdornment>),
                type: stateShow ? 'text' : 'password'
            }}
        />)
}
