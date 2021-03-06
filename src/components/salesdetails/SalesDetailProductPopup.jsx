import React from 'react'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import DrawerMenu from '../common/DrawerMenu'
import SalesOrderProductForm from '../forms/SalesOrderProductForm'
import { useSales } from '../../contexts/SalesContext'
import { useHistory } from 'react-router-dom'

function SalesDetailProductPopup({ isOpen, onClose, salesId }) {
    const history = useHistory()
    const { addProductToOrder, updating } = useSales()
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

                    addProductToOrder(salesId, newProduct)

                    helpers.resetForm()
                    onClose()

                    history.go(0)
                }}>
                {({ errors, handleSubmit, touched }) => (
                    <>
                        <SalesOrderProductForm
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

export default SalesDetailProductPopup
