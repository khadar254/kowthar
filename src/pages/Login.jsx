import React, { useEffect } from 'react'
import { Box, Heading, IconButton } from '@chakra-ui/react'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import LoginForm from '../components/forms/LoginForm'
import { Link } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'

function Login() {
    const history = useHistory()
    const { login, loggin, token } = useAuth()

    const validator = yup.object().shape({
        username: yup.string().required('username is required'),
        password: yup.string().min(8).required('password is required'),
    })

    const isAuthenticated = !!localStorage.getItem('auth-token')

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/dashboard')
        }
    }, [history, token, isAuthenticated])

    return (
        <Box
            width='100%'
            height='100vh'
            overflow='none'
            position='relative'
            bg='#eee'>
            <Box
                width='30%'
                height='auto'
                minHeight='50vh'
                bg='cyan.700'
                position='absolute'
                left='50%'
                top='50%'
                borderRadius='20px'
                transform='translate(-50%, -50%)'
                p='30px'>
                <IconButton as={Link} to='/' icon={<FaChevronLeft />} />
                <Heading color='#fff' my='2rem'>
                    Access Dashboard
                </Heading>

                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    validationSchema={validator}
                    onSubmit={(values, actions) => {
                        login(values)
                        // console.log(values)
                        actions.resetForm()
                    }}>
                    {({ errors, handleSubmit, touched }) => (
                        <LoginForm
                            errors={errors}
                            touched={touched}
                            submit={handleSubmit}
                            loading={loggin}
                            Field={Field}
                        />
                    )}
                </Formik>
            </Box>
        </Box>
    )
}

export default Login
