import React from 'react'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import DrawerMenu from '../common/DrawerMenu'
import InventoryForm from '../forms/InventoryForm'
import { useAuth } from '../../contexts/AuthContext'
import { useInventory } from '../../contexts/InventoryContext'

function InventoryPopup({ isOpen, onClose }) {
    const { user } = useAuth()
    const { createInventory, creating } = useInventory()
    const validator = yup.object().shape({
        // productId: yup.string().required('Product is required'),
        // quantity: yup.number().required('Quantity is required'),
    })
    return (
        <DrawerMenu
            isOpen={isOpen}
            onClose={onClose}
            size='md'
            header='Adding a new inventory'>
            <Formik
                initialValues={{
                    productId: '',
                    quantityAdded: 0,
                    userName: user?.name,
                }}
                validationSchema={validator}
                onSubmit={(values, helpers) => {
                    console.log(values)
                    createInventory(values)

                    helpers.resetForm()
                    onClose()
                }}>
                {({ errors, handleSubmit, touched }) => (
                    <>
                        <InventoryForm
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

export default InventoryPopup
