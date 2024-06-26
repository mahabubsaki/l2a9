'use client';
import { Button, FormControl, TextField } from '@mui/material';
import React from 'react';

const ReviewForm = () => {
    return (
        <FormControl fullWidth component={'form'} sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }} onSubmit={(e) => {
            e.preventDefault();
            console.log(e.target);
        }}>
            <TextField
                fullWidth
                id="outlined-multiline-static"
                label="Review"
                name='review'
                multiline
                rows={4}

            />
            <Button sx={{ maxWidth: 200 }} type='submit' variant='contained'>Submit</Button>
        </FormControl>
    );
};

export default ReviewForm;