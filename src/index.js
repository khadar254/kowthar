import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './Router'
import reportWebVitals from './reportWebVitals'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { theme } from './utils/theme'
import '@fontsource/fira-sans/700.css'
import '@fontsource/fira-sans/400.css'

const app = (
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <CSSReset />
            <AppRouter />
        </ChakraProvider>
    </React.StrictMode>
)

ReactDOM.render(app, document.getElementById('root'))
reportWebVitals()
