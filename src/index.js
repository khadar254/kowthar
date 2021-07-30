import React from 'react'
import './main.scss'
import ReactDOM from 'react-dom'
import AppRouter from './Router'
import reportWebVitals from './reportWebVitals'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { theme } from './utils/theme'
import ContextProvider from './contexts'
import '@fontsource/fira-sans/700.css'
import '@fontsource/fira-sans/400.css'
import 'react-datepicker/dist/react-datepicker.css'

const app = (
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <CSSReset />
            <ContextProvider>
                <AppRouter />
            </ContextProvider>
        </ChakraProvider>
    </React.StrictMode>
)

ReactDOM.render(app, document.getElementById('root'))
reportWebVitals()
