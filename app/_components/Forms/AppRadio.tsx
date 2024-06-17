import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const AppRadio = ({ name, fields }: { name: string; fields: string[]; }) => {
    const { control } = useFormContext();
    return (
        <Controller control={control} name={name} render={({ field, fieldState: { error } }) => {
            console.log(field.value);
            return <FormControl>

                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={(e) => {
                        field.onChange(e.target.value);

                    }}
                >


                    {
                        fields.map((item, index) => {
                            return <FormControlLabel key={index} value={item} control={<Radio />} label={item[0].toUpperCase() + item.slice(1)} />;
                        })
                    }
                </RadioGroup>
                <Typography color={'error'} variant='subtitle2'>{error?.message}</Typography>
            </FormControl>;
        }} />
    );
};

export default AppRadio;