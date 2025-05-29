/*
Din uppgift:
- skriv testfall för alla funktionerna nedan i cart.test.js (RED)
- skriv kod här för att implementera funktionerna (GREEN)

Tips:
- börja med att identifiera VAD som ska testas.
- om du testar t.ex. removeFromCart får du använda addToCart i början av testet. Den kommer nämligen ha sina egna tester

*/
// function getCartItemCount()
// function getItem(index)
// function getTotalCartValue()
// function addToCart(newItem)
// function removeFromCart(itemId)
// function editCart(itemId, newValues)
// function clearCart()
// -------------------------------------------------- //

import { isCartItem, isProduct } from "./validation.js"

let cart = []
let idCounter = 2002
// -------------------------------------------------- //


// Din kod börjar här
// Du får en funktion att börja med

function getItem(index) {
	return (cart[index])
}

function getCartItemCount() {
	return cart.reduce((sum, cartItem) => sum + cartItem.amount, 0)
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
	}

}

function clearCart() {
	cart = []
}



export { getCartItemCount, addToCart, clearCart, getItem }
