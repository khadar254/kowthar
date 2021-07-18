import React from 'react'
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import DrawerMenu from '../common/DrawerMenu'
import { useSales } from '../../contexts/SalesContext'
import DiscountForm from '../forms/DiscountForm'

function SalesAddDiscount({ isOpen, onClose, saleId }) {
    const { updateSales, updating } = useSales()
    const validator = yup.object().shape({
        discount: yup.string(),
    })
    return (
        <DrawerMenu
            isOpen={isOpen}
            onClose={onClose}
            size='md'
            label='Add or remove discount'>
            <Formik
                initialValues={{
                    discount: '',
                }}
                validationSchema={validator}
                onSubmit={(values, helpers) => {
                    const update = {
                        ...values,
                    }
                    updateSales(saleId, update)

                    helpers.resetForm()
                    onClose()
                }}>
                {({ errors, handleSubmit, touched }) => (
                    <>
                        <DiscountForm
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

export default SalesAddDiscount
