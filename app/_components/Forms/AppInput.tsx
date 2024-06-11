import { TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type AppInputProps = {
    name: string;
    label: string;
    required?: boolean;
    type?: string;
};


const AppInput = ({ name, label, required = true, type = 'text' }: AppInputProps) => {
    const { control } = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}

                    label={label}
                    type={type}
                    variant="outlined"


                    placeholder={label}
                    required={required}
                    error={!!error?.message}
                    helperText={error?.message}
                />
            )}
        />
    );
};

export default AppInput;