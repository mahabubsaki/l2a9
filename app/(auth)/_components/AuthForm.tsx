'use client';
import AppForm from '@/app/_components/Forms/AppForm';
import AppInput from '@/app/_components/Forms/AppInput';
import schemaCreator from '@/app/(auth)/_utils/schemaCreator';
import { Box, Button } from '@mui/material';
import React from 'react';
import { FieldValues } from 'react-hook-form';
import { TSchema } from '../_constants';
import { createUser } from '../_actions';


type AuthFormProps = {
  type: TSchema;
  fields: { name: string, type: string; }[];
  initialValues: Record<string, any>;
};

const AuthForm = (props: AuthFormProps) => {
  const { fields, type, ...rest } = props;
  const schema = schemaCreator(type);

  const handleSubmit = (data: FieldValues) => {
    createUser(data);
  };
  return (
    <Box>
      <AppForm sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500, mx: 'auto' }} {...rest} schema={schema} onSubmit={handleSubmit}>
        {
          fields.map(field => <AppInput key={field.name} name={field.name} label={field.name} type={field.type} />)
        }
        <Box display={'flex'} justifyContent={'end'} >
          <Button variant='contained' type='submit'>Submit</Button>
        </Box>
      </AppForm>
    </Box>
  );
};

export default AuthForm;