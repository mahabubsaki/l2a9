
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import Navbar from "./_components/Navbar";
import { ThemeProvider } from '@mui/material';
import theme from './_utils/theme';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <ThemeProvider theme={theme}>
      <AppRouterCacheProvider>
        <Navbar />
        {children}
      </AppRouterCacheProvider>
    </ThemeProvider>
  );
}
