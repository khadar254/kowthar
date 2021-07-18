// function to get the sum of values in an array
export async function calculateGrandTotal(products) {
    // get the subtotals

    const subtotals = products.map((prod) => prod.productPrice * prod.quantity)
    // get the grandtotal
    const grandTotal = subtotals.reduce((red, acc) => {
        const total = red + acc
        return total
    }, 0)

    return grandTotal
}

// function to calculate price after discount
export async function calculateDiscountedPrice(discount, grandTotal) {
    const discountAmount = (grandTotal * discount) / 100
    const discountedPrice = grandTotal - discountAmount
    return discountedPrice
}
