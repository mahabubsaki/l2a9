'use client';
import { Box, Button, IconButton, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { PRODUCT_ENUM } from '../_constants';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import { deleteProduct } from '../_actions';
import Link from 'next/link';





const ProductTable = ({ convertedRows }: { convertedRows: Array<Record<string, any>>; }) => {

    const columns: GridColDef<(typeof convertedRows)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 300 },
        {
            field: 'name',
            headerName: 'Product Name',
            width: 250,
            editable: true,
        },
        {
            field: 'price',
            headerName: 'Price($)',
            type: 'number',
            width: 150,
            editable: true,
            sortable: true,
        },
        {
            field: 'stock',
            headerName: 'Stock',
            type: 'number',
            width: 150,
            editable: true,
            sortable: true
        },
        {
            field: 'discount',
            headerName: 'Discount',
            width: 150,
            editable: true,
            renderCell: (params: Record<string, any>) => {
                return params.value ? `${params.value}%` : 'N/A';
            }
        },
        {
            field: 'discountType',
            headerName: 'Discount Type',
            width: 150,
            editable: true,
            renderCell: (params: Record<string, any>) => {
                return params.value ? `${params.value}` : 'N/A';
            }
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 150,
            editable: true,
            renderCell: (params: Record<string, any>) => {
                // @ts-ignore
                return PRODUCT_ENUM[params.value];
            }
        },

        {
            field: 'size',
            headerName: 'Size',
            width: 150,
            editable: true,
            renderCell: (params: Record<string, any>) => {
                return <Box>{params.value.map((s: string) => s.toUpperCase()).join(', ')}</Box>;
            },
        },
        {
            field: 'action',
            headerName: 'Actions',
            width: 150,
            renderCell: (params: Record<string, any>) => {
                return <>

                    <Link href={`/laundry-products/${params.value}`}>
                        <IconButton aria-label="details">
                            <InfoIcon />
                        </IconButton></Link>
                    <IconButton onClick={() => deleteProduct(params.value)} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>

                    <Link href={`/dashboard/update-product/${params.value}`}>
                        <IconButton aria-label="edit">
                            <EditIcon />
                        </IconButton>
                    </Link>


                </>;
            }
        }


    ];
    return (
        <DataGrid
            rows={convertedRows}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
        />
    );
};

export default ProductTable;