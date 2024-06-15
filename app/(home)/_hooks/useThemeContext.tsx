import React, { useContext } from 'react';
import { ThemeContext } from '../../_contexts/ThemeContext';

const useThemeContext = () => {
    const data = useContext(ThemeContext);
    if (!data) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return data;
};

export default useThemeContext;