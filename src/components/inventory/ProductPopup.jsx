import React from 'react'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import DrawerMenu from '../common/DrawerMenu'
import ProductForm from '../forms/ProductForm'
import { useProduct } from '../../contexts/ProductContext'

function ProductPopup({ isOpen, onClose }) {
    const { createProduct, creating } = useProduct()
    const validator = yup.object().shape({
        name: yup.string().required('Product name is required'),
        price: yup.number().required('Price is required'),
    })
    return (
        <DrawerMenu
            isOpen={isOpen}
            onClose={onClose}
            size='md'
            header='Add a new product'>
            <Formik
                initialValues={{
                    name: '',
                    price: 0,
                }}
                validationSchema={validator}
                onSubmit={(values, helpers) => {
                    createProduct(values)

                    helpers.resetForm()
                    onClose()
                }}>
                {({ errors, handleSubmit, touched }) => (
                    <>
                        <ProductForm
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

export default ProductPopup
