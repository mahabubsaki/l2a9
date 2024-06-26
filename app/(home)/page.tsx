import { Box, Button, Container, Typography } from "@mui/material";



export default function Home() {


  return (
    <main>
      <Box sx={{
        bgcolor: 'grey.100', color: 'grey.800', py: { xs: 16, md: 32 }, px: {
          xs: 4, md: 10, lg: 32, backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center', backgroundRepeat: 'no-repeat'
        }, textAlign: 'center'
      }}>
        <Container maxWidth="xl">
          <Typography variant="h1" color={'whitesmoke'} component="h1" sx={{ fontSize: { xs: '2.5rem', sm: '3rem' }, fontWeight: 'bold' }}>
            One of the best <span style={{ color: '#7C3AED' }}>Laundry Product store</span> in the area
          </Typography>
          <Typography color={'wheat'} variant="body1" sx={{ mt: 8, mb: 12, fontSize: '1.125rem', px: 8 }}>
            Wanna get started with PristinePro? We have got you covered. Get started with our amazing products and services.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" sx={{ bgcolor: '#7C3AED', color: 'grey.50', px: 8, py: 3, m: 2, fontSize: '1.125rem', fontWeight: 'semibold' }}>
              Get started
            </Button>
            <Button variant="outlined" sx={{ color: 'grey.900', borderColor: 'grey.300', px: 8, py: 3, m: 2, fontSize: '1.125rem' }}>
              Learn more
            </Button>
          </Box>
        </Container>
      </Box>
    </main>
  );
}
