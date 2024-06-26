import { getReviews } from '@/app/(home)/fetchers';
import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import ReviewForm from './ReviewForm';

const Review = async ({ productID }: { productID: string; }) => {
    const { data: reviews } = await getReviews(productID);
    return (
        <Box>
            <Typography variant={'h4'}>Add Review</Typography>
            <ReviewForm />
            <Box>
                <Typography variant={'h5'}>Total {reviews.length} Reviews</Typography>
                {
                    reviews.map((review: Record<string, any>) => {
                        return (
                            <Box key={review._id}>
                                <Typography>{review.review}</Typography>
                            </Box>
                        );
                    })
                }
            </Box>
        </Box>
    );
};

export default Review;