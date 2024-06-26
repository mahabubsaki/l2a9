import { getReviews } from '@/app/(home)/fetchers';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import ReviewForm from './ReviewForm';

const Review = async ({ productID }: { productID: string; }) => {
    const { data: reviews } = await getReviews(productID);
    return (
        <Box>
            <Typography variant={'h4'}>Add Review</Typography>
            <ReviewForm productID={productID} />
            <Box>
                <Typography variant={'h5'}>Total {reviews.length} Reviews</Typography>
                {
                    reviews.map((review: Record<string, any>) => {
                        return (
                            <Box key={review._id} maxWidth={400} p={3} borderRadius={2} bgcolor={'ButtonHighlight'} my={2}>
                                <Stack direction={'row'} spacing={5}>
                                    <Box>
                                        <Typography variant='h5'>User : {review.user.name}</Typography>
                                    </Box>
                                    <Typography variant='h5'>at {new Date(review.timestamp).toLocaleTimeString()}</Typography>
                                </Stack>
                                <Typography variant='h6'>Comment : {review.reviewText}</Typography>
                            </Box>
                        );
                    })
                }
            </Box>
        </Box>
    );
};

export default Review;