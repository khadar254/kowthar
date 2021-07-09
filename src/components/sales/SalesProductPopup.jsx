import React from 'react'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import DrawerMenu from '../common/DrawerMenu'
import SalesOrderForm from '../forms/SaleOrderForm'
import { useSales } from '../../contexts/SalesContext'

function SalesProductPopup({ isOpen, onClose }) {
    const { createSales, creating } = useSales()
    const validator = yup.object().shape({
        name: yup.string().required('Name is required'),
        customer: yup.string().required('Customer name is required'),
        number: yup.string().required('Customer number is required'),
    })
    return (
        <DrawerMenu
            isOpen={isOpen}
            onClose={onClose}
            size='md'
            label='New sales order'>
            <Formik
                initialValues={{
                    name: '',
                    customer: '',
                    number: '',
                }}
                validationSchema={validator}
                onSubmit={(values, helpers) => {
                    const customer = {
                        name: values.customer,
                        number: values.number,
                    }

                    const newSalesOrder = {
                        name: values.name,
                        customer,
                    }

                    createSales(newSalesOrder)

                    helpers.resetForm()
                    onClose()
                }}>
                {({ errors, handleSubmit, touched }) => (
                    <>
                        <SalesOrderForm
                            errors={errors}
                            touched={touched}
                            submit={handleSubmit}
                            Field={Field}
                            loading={creating}
                        />
                    </>
                )}
            </Formik>
        </DrawerMenu>
    )
}

export default SalesProductPopup
