import React from 'react'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import DrawerMenu from '../common/DrawerMenu'
import FaultyProductForm from '../forms/FaultyProductForm'
import { useFaultyProduct } from '../../contexts/FaultyContext'

function FaultyProductPopup({ isOpen, onClose }) {
    const { addFaultyProduct, creating } = useFaultyProduct()

    const validator = yup.object().shape({
        product: yup.string().required('Product is required'),
        quantity: yup.number().required('Quantity is required'),
    })

    return (
        <DrawerMenu
            isOpen={isOpen}
            onClose={onClose}
            size='md'
            label='Add a faulty product'>
            <Formik
                initialValues={{
                    product: '',
                    quantity: 0,
                }}
                validationSchema={validator}
                onSubmit={(values, helpers) => {
                    const product = JSON.parse(values.product)

                    const faultyProduct = {
                        productName: product.name,
                        productId: product.id,
                        quantity: values.quantity,
                    }

                    addFaultyProduct(faultyProduct)

                    helpers.resetForm()
                    onClose()
                }}>
                {({ errors, handleSubmit, touched }) => (
                    <>
                        <FaultyProductForm
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

export default FaultyProductPopup
