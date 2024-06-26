'use client';
import { Box, Button, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { deliverOrder } from '../_actions';
import { toast } from 'sonner';

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
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params: Record<string, any>) => {
                if (params.row.status === 'delivered' && role === 'admin') return null;
                if (params.row.status !== 'delivered' && role === 'member') return null;
                if (params.row.status === 'delivered' && role === 'member') return <Box>
                    <Button variant={'contained'}>Give Rating</Button>
                </Box>;

                return (
                    <Box>
                        <Button disabled={isPending} onClick={() => mutate(params.id)} variant={'contained'}>Deliver</Button>
                    </Box>
                );
            }
        }


    ];
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
        </>
    );
};

export default OrderTable;