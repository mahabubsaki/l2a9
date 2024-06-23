'use client';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useActionState, useEffect } from 'react';
import { deleteProduct } from '../_actions';

import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

const Confirmation = ({ open, handleClose }: { open: null | string, handleClose: () => void; }) => {
    const { isPending, mutate } = useMutation({
        mutationKey: ['deleteProduct'],
        mutationFn: (id: string) => deleteProduct(id),
        onError: (err) => {
            toast.error(err?.message || 'Failed to delete product');
        },
        onSuccess: (data) => {
            toast.success(data?.message || 'Product deleted successfully');

        }, onSettled: () => {
            handleClose();
        }
    });
    return (
        <Dialog
            open={!!open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Are you sure, you want to delete this product?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    This action is irreversible. Do you want to proceed? Deleting this product will remove it from the database.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button disabled={isPending} onClick={handleClose}>Disagree</Button>
                <Button disabled={isPending} onClick={() => {
                    if (open) {
                        mutate(open);
                    }
                }} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Confirmation;