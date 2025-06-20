// Remember to use RED, GREEN, REFACTOR
// 1. pick one test case in validation.test.js
// 2. write the code, verify that the test is RED
// 3. write code in this file so that the test case becomes GREEN
// 4. refactor as neccessary before you move on to the next
// 5. repeat

function isCartItem(maybeCartItem) {
    if (typeof maybeCartItem !== 'object' || maybeCartItem === null) {
        return false
    }
    else if (typeof maybeCartItem.item !== 'object' || maybeCartItem.item === null) {
        return false
    }
    else if (typeof maybeCartItem.amount !== 'number' || isNaN(maybeCartItem.amount)) {
        return false
    }
    else if (typeof maybeCartItem.id !== 'number' || isNaN(maybeCartItem.id)) {
        return false
    }
    else if (!isProduct(maybeCartItem.item)) {
        return false
    }

    return true
}

function isProduct(maybeProduct) {

    if (typeof maybeProduct !== 'object' || maybeProduct === null) {
        return false
    }
    else if (typeof maybeProduct.name !== 'string') {
        return false
    }
    else if (typeof maybeProduct.price !== 'number' || isNaN(maybeProduct.price) || maybeProduct.price <= 1) {
        return false
    }
    else if (typeof maybeProduct.id !== 'number' || isNaN(maybeProduct.id)) {
        return false
    }

    return true


}


export { isCartItem, isProduct }
