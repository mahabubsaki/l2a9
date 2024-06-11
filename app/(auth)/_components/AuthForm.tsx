'use client';
import AppForm from '@/app/_components/Forms/AppForm';
import AppInput from '@/app/_components/Forms/AppInput';
import schemaCreator from '@/app/_utils/schemaCreator';
import { Box, Button } from '@mui/material';
import React from 'react';
import { FieldValues } from 'react-hook-form';
import { TSchema } from '../_constants';


type AuthFormProps = {
  type: TSchema;
  fields: string[];
  initialValues: Record<string, any>;
};

const AuthForm = (props: AuthFormProps) => {
  const { fields, type, ...rest } = props;
  const schema = schemaCreator(type);
  const handleSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <Box>
      <AppForm {...rest} schema={schema} onSubmit={handleSubmit}>
        <AppInput name={fields[0]} label={fields[0]} />
        <Button type='submit'>Submit</Button>
      </AppForm>
    </Box>
  );
};

export default AuthForm;