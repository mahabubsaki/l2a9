
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, SxProps } from '@mui/material';
import React from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

type AppFormProps = {
    children: React.ReactNode,
    onSubmit: SubmitHandler<FieldValues>;
    initialValues: Record<string, any>;
    schema: any;
    sx: SxProps;

};

const AppForm = ({ children, initialValues, onSubmit, schema, sx }: AppFormProps) => {
    const methods = useForm({
        defaultValues: initialValues,
        resolver: zodResolver(schema),
    });


    const submit: SubmitHandler<FieldValues> = (data) => {
        // console.log(data);
        onSubmit(data);
        methods.reset();
    };
    console.log(methods.formState.errors);
    return (
        <FormProvider {...methods}>
            <Box component={'form'} sx={{ ...sx }} noValidate onSubmit={methods.handleSubmit(submit)}>
                {children}
            </Box>
        </FormProvider>
    );
};

export default AppForm;