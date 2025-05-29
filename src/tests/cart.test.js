// importera här
import { addToCart, getCartItemCount, clearCart, getItem, getTotalCartValue, removeFromCart, editCart } from "../cart";
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

    //lägg till att den returnerar samma produkt

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

    test("returnerar false vid tom kundvagn", () => {
        expect(getItem(0)).toBe(false)
    })

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

    test("returnerar false vid för högt index", () => {
        const input = { id: 1002, name: "Vattenpistol", price: 40 }
        addToCart(input)
        expect(getItem(1)).toBe(false)
    })

    const wrongCases = [
        -1,
        0.2,
        NaN,
        undefined,
        null,
        "hej"
    ]
    test.each(wrongCases)('returnerar false vid felaktig input: (%s)', (input) => {
        addToCart({ id: 1002, name: "Vattenpistol", price: 40 })
        expect(getItem(input)).toBe(false)
    })
})

describe("getTotalCartValue", () => {
    beforeEach(() => {
        clearCart();
    });

    test("returnerar noll vid tom kundvagn", () => {
        expect(getTotalCartValue()).toBe(0)
    })
    test("returnerar summan av ett objekt", () => {
        addToCart({ id: 1002, name: "Vattenpistol", price: 40 })
        expect(getTotalCartValue()).toBe(40)
    })
    test("returnerar summan av flera objekt med olika amount", () => {
        const input1 = { id: 1002, name: "Vattenpistol", price: 40 }
        const input2 = { id: 1003, name: "Lavapistol", price: 40 }

        addToCart(input1)
        addToCart(input1)
        addToCart(input2)
        expect(getTotalCartValue()).toBe(120)
    })

    //Returnerar trors EDITTT EXT

})

describe("removeFromCart", () => {
    beforeEach(() => {
        clearCart();
    });
    test("returnerar false om inte itemID finns i kundvagn", () => {
        expect(removeFromCart(1002)).toBe(false)
    })

    test("tar bort en produkt via ItemID", () => {
        const input = { id: 1002, name: "Vattenpistol", price: 40 };
        addToCart(input);
        const itemCountBefore = getCartItemCount();
        removeFromCart(1002)
        const itemCountAfter = getCartItemCount();
        expect(itemCountAfter).toBe(itemCountBefore - 1);
    })
    test("tar bort en produkt mitt i listan via ItemID", () => {
        const input1 = { id: 1002, name: "Vattenpistol", price: 40 };
        const input2 = { id: 1003, name: "Lavapistol", price: 40 };
        const input3 = { id: 1004, name: "Luftpistol", price: 40 };
        addToCart(input1);
        addToCart(input2);
        addToCart(input3);
        const itemCountBefore = getCartItemCount();
        removeFromCart(1003)
        const itemCountAfter = getCartItemCount();
        expect(itemCountAfter).toBe(itemCountBefore - 1);
        expect(getItem(0).item.id).toBe(1002);
        expect(getItem(1).item.id).toBe(1004);
    })
    const wrongCases = [
        -1,
        0.2,
        NaN,
        undefined,
        null,
        "hej"
    ]
    test.each(wrongCases)('returnerar false vid felaktig input: (%s)', (input) => {
        addToCart({ id: 1002, name: "Vattenpistol", price: 40 })
        expect(removeFromCart(input)).toBe(false)
    })



})

describe("editCart", () => {
    beforeEach(() => {
        clearCart();
    });
    //FIXA MER GÅ IGONEMom

    test("ändrar amount på en produkt i kundvagnen", () => {
        const product = { id: 1002, name: "Vattenpistol", price: 40 };

        const added = addToCart(product);
        const addedId = added.id
        editCart(addedId, { amount: 5 });

        expect(getItem(0).amount).toBe(5);
    });

    test("returnerar false om produkten inte finns", () => {
        const result = editCart(9999, { amount: 2 });
        expect(result).toBe(false);
    });

    test("returnerar false om newValues inte är ett objekt", () => {
        //SKRIV SOM DE ANDRA
        const product = { id: 1002, name: "Vattenpistol", price: 40 };
        const added = addToCart(product);
        const addedId = added.id
        expect(editCart(addedId, null)).toBe(false);
        expect(editCart(addedId, 5)).toBe(false);
        expect(editCart(addedId, "hej")).toBe(false);
    });

    test("returnerar false om amount inte är ett positivt nummer", () => {
        const product = { id: 1002, name: "Vattenpistol", price: 40 };
        const added = addToCart(product);
        const addedId = added.id
        expect(editCart(addedId, { amount: 0 })).toBe(false);
        expect(editCart(addedId, { amount: -1 })).toBe(false);
        expect(editCart(addedId, { amount: "hej" })).toBe(false);
    });

    test("ändrar inte andra properties än amount", () => {
        const product = { id: 1002, name: "Vattenpistol", price: 40 };
        const added = addToCart(product);
        const addedId = added.id

        editCart(addedId, { amount: 3 });
        expect(getItem(0).amount).toBe(3);
        expect(getItem(0).item.name).toBe("Vattenpistol");
    });

})

describe("clearCart", () => {
    test("borde göra så att getCartItemCount returnerar noll", () => {


        const product = { id: 1002, name: "Vattenpistol", price: 40 }
        const product2 = { id: 1003, name: "Lavapistol", price: 99 }

        addToCart(product)
        addToCart(product2)
        clearCart()
        const expected = 0;
        const actual = getCartItemCount();

        expect(actual).toBe(expected);
    });
    test("borde göra så att getTotalCartValue returnerar noll", () => {


        const product = { id: 1002, name: "Vattenpistol", price: 40 }
        const product2 = { id: 1003, name: "Lavapistol", price: 99 }

        addToCart(product)
        addToCart(product2)
        clearCart()
        const expected = 0;
        const actual = getTotalCartValue();

        expect(actual).toBe(expected);
    });
    test("borde fungera när cart redan är tom", () => {
        clearCart()
        expect(getCartItemCount()).toBe(0);
    })



})

