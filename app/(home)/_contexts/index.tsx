import React from 'react';
import ThemeProvider from './ThemeContext';
import ThemeWrapper from '../_wrappers/ThemeWrapper';

const RootContextProvider = ({ children }: { children: React.ReactNode; }) => {
    return (
        <ThemeProvider>
            <ThemeWrapper>
                {children}
            </ThemeWrapper>

        </ThemeProvider>
    );
};

export default RootContextProvider;