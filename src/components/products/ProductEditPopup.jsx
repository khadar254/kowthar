import React from 'react'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import DrawerMenu from '../common/DrawerMenu'
import ProductForm from '../forms/ProductForm'
import { useProduct } from '../../contexts/ProductContext'

function ProductEditPopup({ isOpen, onClose, product }) {
    const { updateProduct, updating } = useProduct()
    const validator = yup.object().shape({
        name: yup.string().required('Product name is required'),
        price: yup.number().required('Price is required'),
    })
    return (
        <DrawerMenu
            isOpen={isOpen}
            onClose={onClose}
            size='md'
            label={`Edit ${product?.name}`}>
            <Formik
                initialValues={{
                    name: product?.name,
                    price: product?.price,
                }}
                validationSchema={validator}
                onSubmit={(values, helpers) => {
                    updateProduct(product?._id, values)
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
                            Edit
                            loading={updating}
                        />
                    </>
                )}
            </Formik>
        </DrawerMenu>
    )
}

export default ProductEditPopup
