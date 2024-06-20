import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const AppSelect = ({ name, label, menuItem }: { name: string, label: string; menuItem: string[]; }) => {
    const { control } = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => {


                return <FormControl fullWidth error={!!error?.message}>
                    <InputLabel id={name} sx={{ textTransform: 'capitalize' }}>{label}</InputLabel>
                    <Select
                        labelId={name}
                        id={name}
                        label={label}


                        {...field}


                    >
                        {
                            menuItem.map((item, index) => {
                                return <MenuItem key={index} value={item} sx={{ textTransform: 'capitalize' }}>{item[0].toUpperCase() + item.slice(1)}</MenuItem>;
                            })

                        }
                    </Select>
                    <FormHelperText>{error?.message}</FormHelperText>
                </FormControl>;
            }}
        />
    );
};

export default AppSelect;