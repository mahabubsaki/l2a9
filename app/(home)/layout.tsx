
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import Navbar from "./_components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <AppRouterCacheProvider>
      <Navbar />
      {children}
    </AppRouterCacheProvider>
  );
}
