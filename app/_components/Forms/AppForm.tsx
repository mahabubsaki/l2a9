import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

type AppFormProps = {
    children: React.ReactNode,
    onSubmit: SubmitHandler<FieldValues>;
    initialValues: Record<string, any>;
    schema: any;

};

const AppForm = ({ children, initialValues, onSubmit, schema }: AppFormProps) => {
    const methods = useForm({
        defaultValues: initialValues,
        resolver: zodResolver(schema),
    });


    const submit: SubmitHandler<FieldValues> = (data) => {
        // console.log(data);
        onSubmit(data);
        methods.reset();
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(submit)}>
                {children}
            </form>
        </FormProvider>
    );
};

export default AppForm;