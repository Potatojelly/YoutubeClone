import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import styles from './Root.module.css';
import ToggleModeProvider from '../../contexts/ToggleModeContext';
import { DarkModeProvider } from '../../contexts/DarkModeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { YoutubeApiProvider } from '../../contexts/YoutubeApiContext';

const queryClient = new QueryClient();
export default function Root() {
    return (
        <div className={styles.root}>
            <DarkModeProvider>
                <ToggleModeProvider>
                    <Header/>
                    <YoutubeApiProvider>
                        <QueryClientProvider client={queryClient}>
                            <Outlet/>
                        </QueryClientProvider>
                    </YoutubeApiProvider>
                </ToggleModeProvider>
            </DarkModeProvider>
        </div>
    );
}

