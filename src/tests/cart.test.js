// importera här
import { addToCart, getCartItemCount, clearCart, getItem } from "../cart";
import { isCartItem } from "../validation";

describe("getCartItemCount", () => {
    beforeEach(() => {
        clearCart();
    });

    test("getCartItemCount borde returnera noll när cart är tom", () => {
        const expected = 0;
        const actual = getCartItemCount();

        expect(actual).toBe(expected);
    });

    test("getCartItemCount borde returnera ett när du lagt till en produkt", () => {

        const product = { id: 1002, name: "Vattenpistol", price: 40 }

        addToCart(product)

        const expected = 1;
        const actual = getCartItemCount();

        expect(actual).toBe(expected);
    });

    test("getCartItemCount borde returnera rätt antal efter att du lagt till flera produkter", () => {

        const product = { id: 1002, name: "Vattenpistol", price: 40 }
        const product2 = { id: 1003, name: "Lavapistol", price: 99 }

        addToCart(product)
        addToCart(product2)

        const expected = 2;
        const actual = getCartItemCount();

        expect(actual).toBe(expected);
    });
    //DENNA SKJA FIXAS NÄR MAN KAN TA BORT
    test("getCartItemCount borde returnera rätt antal efter att du tagit bort produkter", () => {
        const expected = 0;
        const actual = getCartItemCount();

        expect(actual).toBe(expected);
    });

    test("getCartItemCount ökar amount om produkten redan finns", () => {
        const product = { id: 1002, name: "Vattenpistol", price: 40 }
        const product2 = { id: 1003, name: "Lavapistol", price: 99 }

        addToCart(product)
        addToCart(product)
        addToCart(product2)
        addToCart(product)

        expect(getCartItemCount()).toBe(4);
        expect(getItem(0).amount).toBe(3)
    })

})

describe("addToCart", () => {
    beforeEach(() => {
        clearCart();
    });

    test("lägger till en ny produkt i kundvagnen", () => {
        const itemCountBefore = getCartItemCount();
        const input = { id: 1002, name: "Vattenpistol", price: 40 };
        addToCart(input);
        const itemCountAfter = getCartItemCount();

        expect(itemCountAfter).toBe(itemCountBefore + 1);
    });

    test("lägger till flera nya produkter i kundvagnen", () => {
        const itemCountBefore = getCartItemCount();
        const input = { id: 1002, name: "Vattenpistol", price: 40 };
        addToCart(input);
        addToCart(input)

        const itemCountAfter = getCartItemCount();

        expect(itemCountAfter).toBe(itemCountBefore + 2);
    });

    test("omvandlar till godkänt cart-objekt i kundvagnen", () => {

        const input = { id: 1002, name: "Vattenpistol", price: 40 };
        addToCart(input);

        const addedCartItem = getItem(0)

        expect(isCartItem(addedCartItem)).toBe(true);
    });

    test("returnrar false om prudkten man försököer lägga til är felaktig", () => {

        const input = { id: 1002, name: "Vattenpistol", price: "40" };
        expect(addToCart(input)).toBe(false)
    });

    test("skippar att lägga till felaktig produkt ", () => {

        const input = { id: 1002, name: "Vattenpistol", price: "40" };
        addToCart(input);


        expect(getCartItemCount()).toBe(0);

    });

    // KANSKE KOLLA ID????

});

describe("getItem", () => {
    beforeEach(() => {
        clearCart();
    });

    test("returnerar rätt objekt vid giltigt index", () => {
        const input = { id: 1002, name: "Vattenpistol", price: 40 }
        addToCart(input)
        expect(getItem(0).item.name).toBe("Vattenpistol")
    })
    test("returnerar flera objekt rätt vid giltig index", () => {
        const input1 = { id: 1002, name: "Vattenpistol", price: 40 }
        const input2 = { id: 1003, name: "Lavapistol", price: 89 }
        addToCart(input1)
        addToCart(input2)
        expect(getItem(0).item.name).toBe("Vattenpistol")
        expect(getItem(1).item.name).toBe("Lavapistol")
    })


})
