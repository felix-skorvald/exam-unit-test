// importera här
import { addToCart, getCartItemCount } from "../cart";

describe("Cart", () => {
    beforeEach(() => {
        // Denna kod körs före varje test. Det är för att rensa kundvagnen, så inte saker ligger kvar från föregående test.
        clearCart();
    });

    // -------------------------------------------------- //
    // Skriv dina testfall här
    test("getCartItemCount borde returnera noll när cart är tom", () => {
        const expected = 0;
        const actual = getCartItemCount();

        expect(actual).toBe(expected);
    });

    // Du får ett test att börja med
    test("addToCart lägger till en ny produkt i kundvagnen", () => {
        const itemCountBefore = getCartItemCount();
        const input = { id: 1002, name: "Vattenpistol", price: 40 };

        // addToCart returnerar inget - den påverkar kundvagnen
        // vi behöver använda getCartItemCount för att se om det har lagts till en ny produkt i kundvagnen
        addToCart(input);
        const itemCountAfter = getCartItemCount();

        expect(itemCountAfter).toBe(itemCountBefore + 1);
    });

    // -------------------------------------------------- //
});
