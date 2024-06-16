import { Box, Button, Checkbox } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const AppCheckBox = ({ name, fields }: { name: string; fields: string[]; }) => {
    const { control } = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => {
                console.log(field.value);
                return <Box>
                    {fields.map((item, index) => <Button
                        variant={field.value.includes(item) ? 'contained' : 'outlined'} key={index}>
                        <Checkbox
                            sx={{ position: 'absolute', top: 0, left: 0, opacity: 0, right: 0, bottom: 0 }}
                            {...field}
                            value={item}
                            checked={field.value.includes(item)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    field.onChange([...field.value, item]);
                                } else {
                                    field.onChange(field.value.filter((val: string) => val !== item));
                                }
                            }}
                        />
                        {item}
                    </Button>)}
                </Box>;
            }}
        />
    );
};

export default AppCheckBox;