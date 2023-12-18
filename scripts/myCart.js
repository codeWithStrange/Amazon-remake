export const cart = [

];


export function addToCart(productId) {



	let matchingItem;

	let selectedQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
	cart.forEach((cartItem) => {

		if (productId === cartItem.productId) {
			matchingItem = cartItem;
		}



	});
	if (matchingItem) {
		matchingItem.quantity += selectedQuantity;
	}

	else {

		cart.push({
			productId,
			quantity: selectedQuantity
		})
	}
}