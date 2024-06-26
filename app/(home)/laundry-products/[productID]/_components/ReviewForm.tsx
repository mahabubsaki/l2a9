'use client';
import { verifySession } from '@/app/(auth)/_libs/session';
import { addReview } from '@/app/(home)/_actions';
import { Button, FormControl, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';

const ReviewForm = ({ productID }: { productID: string; }) => {
    const [text, setText] = React.useState('');
    const { mutate, isPending, } = useMutation({
        mutationKey: ['addReview'],
        mutationFn: addReview,
        onSuccess: (data: Record<string, any>) => {
            toast.success(data.message);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }, onMutate: () => {
            setText('');
        }
    });

    return (
        <FormControl fullWidth component={'form'} sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }} onSubmit={async (e) => {
            e.preventDefault();

            mutate({ reviewText: text, productId: productID });
        }}>
            <TextField
                value={text}
                onChange={(e) => setText(e.target.value)}
                fullWidth
                id="outlined-multiline-static"
                label="Review"
                name='review'
                multiline
                rows={4}

            />
            <Button disabled={isPending} sx={{ maxWidth: 200 }} type='submit' variant='contained'>Submit</Button>
        </FormControl>
    );
};

export default ReviewForm;