import React from 'react'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import DrawerMenu from '../common/DrawerMenu'
import { useSales } from '../../contexts/SalesContext'
import SalesProductForm from '../forms/SalesProductForm'

function SalesProductEditPopup({ isOpen, onClose, product, salesId }) {
    const { updateProductToOrder, updating } = useSales()
    const validator = yup.object().shape({
        price: yup.number().required('Price is required'),
        quantity: yup.number().required('Quantity is required'),
    })
    return (
        <DrawerMenu
            isOpen={isOpen}
            onClose={onClose}
            size='md'
            label={`Edit ${product?.name}`}>
            <Formik
                initialValues={{
                    price: product?.productPrice,
                    quantity: product?.quantity,
                }}
                validationSchema={validator}
                onSubmit={(values, helpers) => {
                    const update = {
                        ...product,
                        productPrice: values.price,
                        quantity: values.quantity,
                    }

                    updateProductToOrder(salesId, product?.name, update)

                    helpers.resetForm()
                    onClose()
                    location.reload()
                }}>
                {({ errors, handleSubmit, touched }) => (
                    <>
                        <SalesProductForm
                            errors={errors}
                            touched={touched}
                            submit={handleSubmit}
                            Field={Field}
                            loading={updating}
                        />
                    </>
                )}
            </Formik>
        </DrawerMenu>
    )
}

export default SalesProductEditPopup
