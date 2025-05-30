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

    test("getCartItemCount borde returnera rätt antal efter att du tagit bort produkter", () => {
        const product = { id: 1002, name: "Vattenpistol", price: 40 }

        const added = addToCart(product)
        removeFromCart(added.id)

        expect(getCartItemCount()).toBe(0);
    });
    //Denna åker bort
    // test("getCartItemCount ökar amount om produkten redan finns", () => {
    //     const product = { id: 1002, name: "Vattenpistol", price: 40 }
    //     const product2 = { id: 1003, name: "Lavapistol", price: 99 }

    //     addToCart(product)
    //     addToCart(product)
    //     addToCart(product2)
    //     addToCart(product)

    //     expect(getCartItemCount()).toBe(4);
    //     expect(getItem(0).amount).toBe(3)
    // })

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

    test("lägger till rätt produkt", () => {
        const input = { id: 1002, name: "Vattenpistol", price: 40 };

        addToCart(input);

        expect(getItem(0).item.id).toBe(1002);
    });

    test("lägger till flera nya produkter i kundvagnen", () => {
        const itemCountBefore = getCartItemCount();
        const input1 = { id: 1002, name: "Vattenpistol", price: 40 };
        const input2 = { id: 1003, name: "Lavapistol", price: 40 }
        addToCart(input1);
        addToCart(input2);

        const itemCountAfter = getCartItemCount();

        expect(itemCountAfter).toBe(itemCountBefore + 2);
    });

    test("ökar amount om man lägger till produkt som redan finnes", () => {
        const input = { id: 1002, name: "Vattenpistol", price: 40 };

        addToCart(input);
        addToCart(input);

        expect(getItem(0).amount).toBe(2);
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

});

describe("getItem", () => {
    beforeEach(() => {
        clearCart();
    });

    test("kastar error vid tom kundvagn", () => {
        expect(() => getItem(0)).toThrow("Invalid cart index")
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

    test("kastar error vid för högt index", () => {
        const input = { id: 1002, name: "Vattenpistol", price: 40 }
        addToCart(input)
        expect(() => getItem(1)).toThrow("Invalid cart index")
    })

    const wrongCases = [
        -1,
        0.2,
        NaN,
        undefined,
        null,
        "hej"
    ]
    test.each(wrongCases)('kastar error vid felaktig input: (%s)', (input) => {
        addToCart({ id: 1002, name: "Vattenpistol", price: 40 })
        expect(() => getItem(input)).toThrow("Invalid cart index")
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

    test("returnerar rätt summa efter editCart ändrat amount", () => {
        const input = { id: 1002, name: "Vattenpistol", price: 40 }

        const added = addToCart(input)

        editCart(added.id, { amount: 10 })
        expect(getTotalCartValue()).toBe(400)
    })



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
        const added = addToCart(input);
        const itemCountBefore = getCartItemCount();
        removeFromCart(added.id)
        const itemCountAfter = getCartItemCount();
        expect(itemCountAfter).toBe(itemCountBefore - 1);
    })
    test("tar bort en produkt mitt i listan via ItemID", () => {
        const input1 = { id: 1002, name: "Vattenpistol", price: 40 };
        const input2 = { id: 1003, name: "Lavapistol", price: 40 };
        const input3 = { id: 1004, name: "Luftpistol", price: 40 };
        const added1 = addToCart(input1);
        const added2 = addToCart(input2);
        const added3 = addToCart(input3);
        const itemCountBefore = getCartItemCount();
        removeFromCart(added2.id)
        const itemCountAfter = getCartItemCount();
        expect(itemCountAfter).toBe(itemCountBefore - 1);
        expect(getItem(0).id).toBe(added1.id);
        expect(getItem(1).id).toBe(added3.id);
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

    test("ändrar amount på en produkt i kundvagnen", () => {
        const product = { id: 1002, name: "Vattenpistol", price: 40 };

        const added = addToCart(product);
        const addedId = added.id
        editCart(addedId, { amount: 5 });

        expect(getItem(0).amount).toBe(5);
    });

    test("returnerar false om produkten inte finns", () => {
        expect(() => editCart(9999, { amount: 2 })).toThrow("object not found or newValues is not an object")
    });

    const wrongCasesObject = [
        null,
        5,
        "hej"
    ]
    test.each(wrongCasesObject)('kastar error vid om newValues inte är ett objekt: (%s)', (input) => {

        const added = addToCart({ id: 1002, name: "Vattenpistol", price: 40 })
        const addedId = added.id

        expect(() => editCart(addedId, input)).toThrow("object not found or newValues is not an object")
    })

    const wrongCases = [
        0,
        -1,
        "hej",
        undefined,
        null
    ]
    test.each(wrongCases)('kastar error vid om amount inte är ett positivt nummer: (%s)', (input) => {

        const added = addToCart({ id: 1002, name: "Vattenpistol", price: 40 })
        const addedId = added.id

        expect(() => editCart(addedId, { amount: input })).toThrow("Amount got to be a number and more than 0")
    })

    test("ändrar inte andra properties än amount", () => {
        const product = { id: 1002, name: "Vattenpistol", price: 40 };
        const added = addToCart(product);
        const addedId = added.id

        editCart(addedId, { amount: 3, name: "lava" });
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

