'use client';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating, Slide, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useMutation } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { deliverOrder } from '../_actions';
import { toast } from 'sonner';
import { TransitionProps } from '@mui/material/transitions';

const OrderTable = ({ convertedRows, role }: { convertedRows: Array<Record<string, any>>; role: string; }) => {

    const { mutate, isPending } = useMutation({
        mutationKey: ['deliverOrder'],
        mutationFn: deliverOrder,
        onError: (error: Error) => {
            console.log(error);
            toast.error(error.message || 'Failed to deliver order');
        }, onSuccess: (data) => {
            toast.success(data.message || 'Order delivered successfully');
        }
    });
    const [open, setOpen] = React.useState<null | string>(null);
    const [value, setValue] = React.useState<number | null>(0);
    const handleClickOpen = (id: string) => {
        setOpen(id);
    };

    const handleClose = () => {
        setValue(0);
        setOpen(null);
    };
    const columns: GridColDef<(typeof convertedRows)[number]>[] = [
        { field: 'id', headerName: 'Order ID', width: 300 },
        {
            field: 'orderDate',
            headerName: 'Order Date',
            width: 250,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
        },
        {
            field: 'email',
            headerName: 'Customer Email',
            width: 250
        },
        {
            field: 'name',
            headerName: 'Customer Name',
            width: 250
        },
        {
            field: 'totalCost',
            headerName: 'Total Cost($)',
            width: 150
        },
        {
            field: 'totalItem',
            headerName: 'Total Item',
            width: 150

        },
        {
            field: 'rating',
            headerName: 'Rating',
            width: 150,
            renderCell: (params: Record<string, any>) => {
                return params.value ? <Rating value={params.value} readOnly /> : 'N/A';
            }
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params: Record<string, any>) => {
                console.log(params);
                if (params.row.rating) return null;
                if (params.row.status === 'delivered' && role === 'admin') return null;
                if (params.row.status !== 'delivered' && role === 'member') return null;
                if (params.row.status === 'delivered' && role === 'member') return <Box>
                    <Button onClick={() => handleClickOpen(params.id)} variant={'contained'}>Give Rating</Button>
                </Box>;

                return (
                    <Box>
                        <Button disabled={isPending} onClick={() => mutate({ id: params.id, status: 'delivered' })} variant={'contained'}>Deliver</Button>
                    </Box>
                );
            }
        }


    ];
    const Transition = useMemo(() => {
        return React.forwardRef(function Transition(
            props: TransitionProps & {
                children: React.ReactElement<any, any>;
            },
            ref: React.Ref<unknown>,
        ) {
            return <Slide direction="up" ref={ref} {...props} />;
        });
    }, []);
    return (
        <>
            {convertedRows.length ? <DataGrid
                rows={convertedRows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                localeText={{
                    noRowsLabel: 'No products found'
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            /> : <Stack spacing={2} justifyContent={'center'} alignItems={'center'}>
                <Box>
                    No Orders Found
                </Box>
            </Stack>}
            <Dialog
                maxWidth='xl'
                open={!!open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Give Rating"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={() => {
                        mutate({ id: open, rating: value });
                        handleClose();
                    }}>Done</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default OrderTable;