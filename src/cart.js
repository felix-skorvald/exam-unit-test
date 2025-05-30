import { isCartItem, isProduct } from "./validation.js"

let cart = []
let idCounter = 2002

function getItem(index) {
	if (
		index === null ||
		typeof index !== "number" ||
		!Number.isInteger(index) ||
		isNaN(index) ||
		index < 0 ||
		index >= cart.length
	) {
		throw new Error("Invalid cart index")
	}
	return cart[index]
}

function getCartItemCount() {
	// return cart.reduce((sum, cartItem) => sum + cartItem.amount, 0)
	return cart.length
}

function getTotalCartValue() {
	return cart.reduce((sum, cartItem) => sum + cartItem.item.price * cartItem.amount, 0)
}

function addToCart(newItem) {
	if (!isProduct(newItem)) {
		return false
	}

	const existing = cart.find(cartItem => cartItem.item.id === newItem.id)

	if (existing) {
		existing.amount++

	} else {
		const newCartItem = { id: idCounter, amount: 1, item: newItem }
		idCounter++
		cart.push(newCartItem)
		return newCartItem;
	}

}

function removeFromCart(itemId) {
	const found = cart.find(item => item.id === itemId)

	if (found) {

		cart = cart.filter(item => item.id !== itemId)
	} else { return false }
}

function editCart(itemId, newValues) {
	const cartItem = cart.find(item => item.id === itemId)

	if (!cartItem || typeof newValues !== "object" || newValues === null) {
		throw new Error("object not found or newValues is not an object")
	}
	if (typeof newValues.amount === "number" && newValues.amount > 0) {
		cartItem.amount = newValues.amount

	} else {
		throw new Error("Amount got to be a number and more than 0")
	}

}

function clearCart() {
	cart = []
}



export { getCartItemCount, addToCart, clearCart, getItem, getTotalCartValue, removeFromCart, editCart }
