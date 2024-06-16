

import Navbar from "./_components/Navbar";



export default function PrimaryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (


    <>
      <Navbar />
      {children}


    </>


  );
}
