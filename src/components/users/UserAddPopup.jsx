import React from 'react'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import DrawerMenu from '../common/DrawerMenu'
import { useAuth } from '../../contexts/AuthContext'
import UserForm from '../forms/UserForm'

function UserAddPopup({ isOpen, onClose }) {
    const { createUser, creating } = useAuth()

    const validator = yup.object().shape({
        name: yup.string().required('Name is required'),
        username: yup.string().required('Name is required').min(6),
        email: yup
            .string()
            .required('Email required')
            .email('Please enter a valid email'),
        role: yup.string(),
        password: yup.string().required('Password required').min(6),
        confirmpass: yup.string().when('password', {
            is: (val) => (val && val.length > 0 ? true : false),
            then: yup
                .string()
                .oneOf([yup.ref('password')], 'Passwords do not much'),
        }),
    })
    return (
        <DrawerMenu
            isOpen={isOpen}
            onClose={onClose}
            size='md'
            header='Adding a new user'>
            <Formik
                initialValues={{
                    name: '',
                    username: '',
                    email: '',
                    role: '',
                    password: '',
                    confirmpass: '',
                }}
                validationSchema={validator}
                onSubmit={(values, actions) => {
                    delete values.confirmpass

                    createUser(values)

                    actions.resetForm()
                    onClose()
                }}>
                {({ errors, touched, handleSubmit }) => (
                    <UserForm
                        errors={errors}
                        touched={touched}
                        submit={handleSubmit}
                        Field={Field}
                        loading={creating}
                    />
                )}
            </Formik>
        </DrawerMenu>
    )
}

export default UserAddPopup
