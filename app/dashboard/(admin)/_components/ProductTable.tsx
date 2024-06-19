'use client';
import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { PRODUCT_ENUM } from '../_constants';





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
            headerName: 'Price',
            type: 'number',
            width: 150,
            editable: true,
            sortable: true
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
                return PRODUCT_ENUM[params.value];
            }
        },

        {
            field: 'size',
            headerName: 'Size',
            width: 150,
            editable: true,
            renderCell: (params: Record<string, any>) => {
                return <Box>{params.value.map(s => s.toUpperCase()).join(', ')}</Box>;
            },
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