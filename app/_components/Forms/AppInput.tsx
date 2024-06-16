
import { Box, TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
type AppInputProps = {
    name: string;
    label: string;
    required?: boolean;
    type?: string;
    size?: 'small' | 'medium';
    textarea?: boolean;
};


const AppInput = ({ name, label, type = 'text', size = 'small', textarea = false }: AppInputProps) => {
    const { control } = useFormContext();
    const [inputType, setInputType] = React.useState(type);
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => {

                return <Box position={'relative'} >
                    <TextField
                        {...field}
                        InputLabelProps={{
                            sx: {
                                textTransform: 'capitalize'
                            }
                        }}

                        fullWidth
                        size={size}
                        multiline={textarea}
                        rows={6}
                        autoComplete='off'
                        label={label}
                        type={inputType}
                        variant="outlined"
                        placeholder={'Enter ' + label}
                        error={!!error?.message}
                        helperText={error?.message}
                    />
                    {
                        inputType === 'password' ? <VisibilityIcon onClick={() => {
                            setInputType('text');
                        }} sx={{ display: type == 'password' ? 'inline-block' : 'none', position: 'absolute', right: 10, top: '50%', bottom: '50%', transform: error?.message ? 'translate(0px,-90%)' : 'translate(0px,-50%)', cursor: 'pointer' }} /> : <VisibilityOffIcon onClick={() => {
                            setInputType('password');
                        }} sx={{ display: type == 'password' ? 'inline-block' : 'none', position: 'absolute', right: 10, top: '50%', bottom: '50%', transform: error?.message ? 'translate(0px,-90%)' : 'translate(0px,-50%)', cursor: 'pointer' }} />
                    }
                </Box>;
            }}
        />
    );
};

export default AppInput;