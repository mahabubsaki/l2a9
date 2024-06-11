'use client';
import React, { useContext } from 'react';
import { ThemeContext } from '../_contexts/ThemeContext';
import { ThemeProvider } from '@mui/material';

const ThemeWrapper = ({ children }: { children: React.ReactNode; }) => {
  const { theme } = useContext(ThemeContext)!!;
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;