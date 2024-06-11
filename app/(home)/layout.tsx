
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import Navbar from "./_components/Navbar";
import RootContextProvider from './_contexts';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (


    <AppRouterCacheProvider>


      <RootContextProvider>
        <Navbar />
        {children}
      </RootContextProvider>


    </AppRouterCacheProvider>




  );
}
