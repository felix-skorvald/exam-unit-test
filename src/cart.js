/*
Din uppgift:
- skriv testfall för alla funktionerna nedan i cart.test.js (RED)
- skriv kod här för att implementera funktionerna (GREEN)

Tips:
- börja med att identifiera VAD som ska testas.
- om du testar t.ex. removeFromCart får du använda addToCart i början av testet. Den kommer nämligen ha sina egna tester

*/
// function getCartItemCount() KLAR?
// function getItem(index) <KLAR
// function getTotalCartValue() klar typ
// function addToCart(newItem) KLARTPY?
// function removeFromCart(itemId) KLar
// function editCart(itemId, newValues)
// function clearCart()Klar
// -------------------------------------------------- //

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
		return false
	} else
		return cart[index]
}

function getCartItemCount() {
	return cart.reduce((sum, cartItem) => sum + cartItem.amount, 0)
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
	const found = cart.find(item => item.item.id === itemId)

	if (found) {

		cart = cart.filter(item => item.item.id !== itemId)
	} else { return false }
}

function editCart(itemId, newValues) {
	const cartItem = cart.find(item => item.id === itemId)
	if (!cartItem || typeof newValues !== "object" || newValues === null) {
		return false
	}
	if (typeof newValues.amount === "number" && newValues.amount > 0) {
		cartItem.amount = newValues.amount

	} else {
		return false
	}
	if (newValues.item && isProduct(newValues.item)) {
		cartItem.item = newValues.item

	} else { return false }

}

function clearCart() {
	cart = []
}



export { getCartItemCount, addToCart, clearCart, getItem, getTotalCartValue, removeFromCart, editCart }
