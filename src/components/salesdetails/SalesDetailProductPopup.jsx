import React from 'react'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import DrawerMenu from '../common/DrawerMenu'
import { useProduct } from '../../contexts/ProductContext'
import SalesOrderProductForm from '../forms/SalesOrderProductForm'

function SalesDetailProductPopup({ isOpen, onClose }) {
    const { createProduct, creating } = useProduct()
    const validator = yup.object().shape({
        name: yup.object().required('Product name is required'),
        quantity: yup.number().required('Quantity is required'),
    })
    return (
        <DrawerMenu
            isOpen={isOpen}
            onClose={onClose}
            size='md'
            label='Add product to sales order'>
            <Formik
                initialValues={{
                    name: {},
                    quantity: 0,
                }}
                validationSchema={validator}
                onSubmit={(values, helpers) => {
                    const product = JSON.parse(values.name)

                    const newProduct = {
                        name: product.name,
                        quantity: values.quantity,
                        productPrice: product.price,
                    }

                    console.log(newProduct)

                    // createProduct(values)

                    helpers.resetForm()
                    onClose()
                }}>
                {({ errors, handleSubmit, touched, values }) => (
                    <>
                        <SalesOrderProductForm
                            errors={errors}
                            touched={touched}
                            submit={handleSubmit}
                            Field={Field}
                            loading={creating}
                        />
                        <pre>{JSON.stringify(values, null, 3)}</pre>
                    </>
                )}
            </Formik>
        </DrawerMenu>
    )
}

export default SalesDetailProductPopup
