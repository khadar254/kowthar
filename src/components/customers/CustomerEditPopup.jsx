import React from 'react'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import DrawerMenu from '../common/DrawerMenu'
import CustomerForm from '../forms/CustomerForm'
import { useCustomer } from '../../contexts/CustomerContext'

function CustomerEditPopup({ isOpen, onClose, customer }) {
    const { updateCustomer, updating } = useCustomer()
    const validator = yup.object().shape({
        name: yup.string().required('Customer name is required'),
        number: yup.string().required('Customer number is required'),
    })
    return (
        <DrawerMenu
            isOpen={isOpen}
            onClose={onClose}
            size='md'
            label={`Edit ${customer?.name}`}>
            <Formik
                initialValues={{
                    name: customer?.name,
                    number: customer?.number,
                }}
                validationSchema={validator}
                onSubmit={(values, helpers) => {
                    updateCustomer(customer?._id, values)
                    helpers.resetForm()
                    onClose()
                }}>
                {({ errors, handleSubmit, touched }) => (
                    <>
                        <CustomerForm
                            errors={errors}
                            touched={touched}
                            submit={handleSubmit}
                            Field={Field}
                            Edit
                            loading={updating}
                        />
                    </>
                )}
            </Formik>
        </DrawerMenu>
    )
}

export default CustomerEditPopup
