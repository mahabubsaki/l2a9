import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const AppSelect = ({ name, label }: { name: string, label: string; }) => {
    const { control } = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => {

                return <FormControl error={!!error?.message}>
                    <InputLabel id={name} sx={{ textTransform: 'capitalize' }}>{name}</InputLabel>
                    <Select
                        labelId={name}
                        id={name}
                        label={label}


                        {...field}


                    >
                        <MenuItem value={'admin'}>Admin</MenuItem>
                        <MenuItem value={'user'}>User</MenuItem>
                    </Select>
                    <FormHelperText>{error?.message}</FormHelperText>
                </FormControl>;
            }}
        />
    );
};

export default AppSelect;