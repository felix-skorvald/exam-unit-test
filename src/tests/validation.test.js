import { isCartItem, isProduct } from "../validation.js"

const exampleProduct = {
	id: 1001,
	name: 'Badanka',
	price: 500
}

const exampleCartObject = {
	id: 2001,
	amount: 1,
	item: exampleProduct
}

describe('Validation cartObject', () => {

	test("isCartItem borde returnera true med godkändt objekt", () => {
		const expected = true;
		const actual = isCartItem(exampleCartObject);

		expect(actual).toBe(expected);
	});

	const casesCart1 = [
		[false, 'inte ett objekt alls'],
		[false, null],
		[false, 0]
	]
	test.each(casesCart1)('om cartItem inte är ett objekt, returnera då false (expect %s, värde %s)', (expected, input) => {
		const actual = isCartItem(input)
		expect(actual).toBe(expected)
	})


	const casesCart2 = [
		[{}],
		[{ amount: 1, item: exampleProduct }],
		[{ id: 2001, item: exampleProduct }],
		[{ id: 2001, amount: 1 }],
		[{ id: 2001, amount: 1, item: { name: "Ogiltig produkt" } }],
		[{ id: 2001, amount: "ett", item: exampleProduct }],
		[{ id: NaN, amount: 1, item: exampleProduct }],
		[{ id: 2001, amount: NaN, item: exampleProduct }],
	]
	test.each(casesCart2)('om cartItem är ett objekt men i ogiltigt format, returnera false (%s)', (input) => {
		expect(isCartItem(input)).toBe(false)
	})
})



describe('Validation product', () => {

	test("isProduct borde returnera true med godkänd produkt", () => {
		const expected = true;
		const actual = isProduct(exampleProduct);

		expect(actual).toBe(expected);
	})

	const casesProduct1 = [
		[false, 'inte ett objekt alls'],
		[false, null],
		[false, 0],
		[false, undefined],
	]
	test.each(casesProduct1)('om product inte är ett objekt, returnera då false (expect %s, värde %s)', (expected, input) => {
		const actual = isProduct(input)
		expect(actual).toBe(expected)
	})

	const casesProduct2 = [
		[{}],
		[{ name: "Badanka", price: 500 }],
		[{ id: 1001, price: 500 }],
		[{ id: 1001, name: "Badanka" }],
		[{ id: 1001, name: "Badanka", price: "500kr" }],
		[{ id: 1001, name: 2222, price: 500 }],
		[{ id: NaN, name: "Badanka", price: 500 }],
		[{ id: 1001, name: "Badanka", price: NaN }],
		[{ id: 1001, name: "Badanka", price: -10 }]
	]
	test.each(casesProduct2)('om product är ett objekt men i ogiltigt format, returnera false (%s)', (input) => {
		expect(isProduct(input)).toBe(false)
	})
})
