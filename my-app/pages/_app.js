import '@/styles/globals.css';
import { AuthContextProvider } from '@/config/Context';
import { ThemeProvider } from "@material-tailwind/react";

export default function App({ Component, pageProps }) {
  return (
      <ThemeProvider>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </ThemeProvider>
  )
}
