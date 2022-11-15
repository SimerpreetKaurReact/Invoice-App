import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { ErrorBoundary } from '../src/components/ErrorBoundary'
import { AuthContextProvider } from '../src/user/AuthContext'
import { CompanyContextProvider } from '../src/company/CompanyDetailsAuth'
import { SnackbarProvider, } from 'notistack';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const theme = {}
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}> <LocalizationProvider dateAdapter={AdapterLuxon}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <AuthContextProvider>
          <CompanyContextProvider>
            <CssBaseline />

            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>

          </CompanyContextProvider>
        </AuthContextProvider>
      </SnackbarProvider>  </LocalizationProvider>
    </ThemeProvider>)
}

export default MyApp
