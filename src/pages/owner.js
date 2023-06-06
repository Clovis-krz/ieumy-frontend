import React, { useEffect } from 'react';
import { useState } from 'react';

import HeaderOwner from '../components/owner/Header.js';

import theme from '../components/Theme.js';
import { ThemeProvider } from '@mui/material/styles';

export default function Main() {

    return (
        <>
            <ThemeProvider theme={theme}>
            <HeaderOwner />
            </ThemeProvider>
        </>
    );
}