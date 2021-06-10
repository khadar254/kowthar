import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import LoginForm from '../components/forms/LoginForm'

function Login() {
    const validator = yup.object().shape({
        username: yup.string().required('username is required'),
        password: yup.string().min(8).required('password is required'),
        loginas: yup.string().required('Please select an option'),
    })
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
                bg='cyan.600'
                position='absolute'
                left='50%'
                top='50%'
                borderRadius='20px'
                transform='translate(-50%, -50%)'
                p='30px'>
                <Heading color='#fff' my='2rem'>
                    Access Dashboard
                </Heading>

                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                        loginas: '',
                    }}
                    validationSchema={validator}
                    onSubmit={(values, actions) => {
                        actions.setIsSubmitting(true)

                        console.log(values)

                        actions.setIsSubmitting(false)
                        actions.resetForm()
                    }}>
                    {({ isSubmitting, errors, handleSubmit, touched }) => (
                        <LoginForm
                            errors={errors}
                            touched={touched}
                            submit={handleSubmit}
                            loading={isSubmitting}
                            Field={Field}
                        />
                    )}
                </Formik>
            </Box>
        </Box>
    )
}

export default Login
