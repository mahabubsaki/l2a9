import React from 'react';
import ThemeProvider from './ThemeContext';

import TanstckProvider from '../_providers/TanStack.provider';
import SonnerProvider from '../_providers/Sonner.provider';

const RootContextProvider = ({ children }: { children: React.ReactNode; }) => {
    return (
        <TanstckProvider>
            <SonnerProvider>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </SonnerProvider>
        </TanstckProvider>
    );
};

export default RootContextProvider;