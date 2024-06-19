'use client';
import AppForm from '@/app/_components/Forms/AppForm';
import AppInput from '@/app/_components/Forms/AppInput';
import schemaCreator from '@/app/(auth)/_utils/schemaCreator';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { TSchema } from '../_constants';
import { createUser, deleteCookie, signInUser } from '../_actions';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import AppSelect from '@/app/_components/Forms/AppSelect';


type AuthFormProps = {
  type: TSchema;
  fields: { name: string, type: string; }[];
  initialValues: Record<string, any>;
  isAuth: boolean;
};

const AuthForm = (props: AuthFormProps) => {
  const { fields, type, isAuth, ...rest } = props;
  const router = useRouter();
  useEffect(() => {
    if (!isAuth) {
      deleteCookie('session');
    }
  }, [isAuth]);

  const { mutate: mutateCreate, error, isError, isPending, } = useMutation({
    mutationFn: type === 'sign-up' ? createUser : signInUser,
    mutationKey: [type === 'sign-up' ? 'createUser' : 'signInUser']

  });



  const schema = schemaCreator(type);

  const handleSubmit = (data: FieldValues) => {
    mutateCreate(data, {
      onError: (error) => console.log(error.message),
      onSuccess: async (data) => {

        toast.success(data.message);
        router.replace('/');
      }
    });
  };
  return (
    <Box>
      {
        isError && <Box sx={{ maxWidth: 500, mx: 'auto', my: 4, p: 3 }} bgcolor={'#FFDADC'}>
          <Typography color={'#FF474D'} fontWeight={700}>
            Error : {error?.message}
          </Typography>
        </Box>
      }
      <AppForm sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500, mx: 'auto', my: 2 }} {...rest} schema={schema} onSubmit={handleSubmit}>
        {
          fields.map(field => {
            return field.type === 'select' ? <AppSelect menuItem={['admin', 'user']} key={field.name} name={field.name} label={field.name} /> : <AppInput key={field.name} name={field.name} label={field.name} type={field.type} />;
          })
        }
        <Box display={'flex'} justifyContent={'end'} >
          <Button disabled={isPending} variant='contained' type='submit'>{isPending ? `Signing ${type === 'sign-up' ? 'Up' : 'In'}...` : `Sign ${type === 'sign-up' ? 'Up' : 'In'}`}</Button>
        </Box>
      </AppForm>
    </Box>
  );
};

export default AuthForm;