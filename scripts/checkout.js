import { cart, removeFromCart, updateCartQuantity, updateCartQuantity2, cartQuantity, saveToStorage, updateDeliveryOption } from "../data/myCart.js";
import { products } from "../data/myProduct.js";

import { formatCurrency } from './Utils/money.js'
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { deliveryOptions } from '../data/deliveryOptions.js'

function updateItems() {
	document.querySelector('.js-total-items').innerHTML = `${cartQuantity()} items`;
	document.querySelector('.js-total-items-row').innerHTML = `items (${cartQuantity()})`;
}
updateItems();
function renderPage() {
	let cartSummaryHTML = ''
	const updateCartSummary = () => {

		cart.forEach((cartItem) => {

			let option;
			deliveryOptions.forEach((options) => {
				if (cartItem.deliveryOptionId === options.id) {
					option = options;
				}
			})

			const today = dayjs();
			const deliveryDate = today.add(
				option.deliveryDays, 'days'
			);
			const datetring = deliveryDate.format('dddd, MMMM, D');



			const productId = cartItem.productId
			let matchingProduct;


			products.forEach((product) => {
				if (product.id === productId) {
					matchingProduct = product;
				}

			});






			cartSummaryHTML +=
				`
			<div
				class="cart-item-container js-cart-item-container-${matchingProduct.id} "
			>
				<div class="delivery-date">Delivery date: ${datetring}</div>
	
				<div class="cart-item-details-grid">
					<img class="product-image" src="${matchingProduct.image}" />
	
					<div class="cart-item-details">
						<div class="product-name">${matchingProduct.name}</div>
	
						<div class="product-price">
							$${formatCurrency(matchingProduct.priceCents)}
						</div>
						<div class="product-quantity">
							<span>
								Quantity:
								<input
									type="number"
									min="0"
									class="update-input-field js-input-${matchingProduct.id}"
								/>
								<span
									class="quantity-label js-display-quantity${matchingProduct.id}"
									>${cartItem.quantity}</span
								>
							</span>
							<span
								class="update-quantity-link-${matchingProduct.id} link-primary update-quantity-link"
								data-product-id="${matchingProduct.id}"
							>
								Update
							</span>
							<span
								class="update-quantity-link-save-${matchingProduct.id} link-primary update-quatity-save"
								data-product-id="${matchingProduct.id}"
							>
								Save
							</span>
							<span
								class="delete-quantity-link link-primary js-delete-quantity"
								data-product-id="${matchingProduct.id}"
							>
								Delete
							</span>
						</div>
					</div>
	
					<div class="delivery-options">
						<div class="delivery-options-title">Choose a delivery option:</div>
							${deliveryOptionsHTML(matchingProduct, cartItem)}
					</div>
				</div>
			</div>
			`
		});



		document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;


	}

	updateCartSummary();

	function deliveryOptionsHTML(matchingProduct, cartItem) {
		let html = '';
		deliveryOptions.forEach((deliveryOption) => {
			const today = dayjs();
			const deliveryDate = today.add(
				deliveryOption.deliveryDays, 'days'
			);
			const datetring = deliveryDate.format('dddd, MMMM, D');
			const priceString = deliveryOption.priceCents === 0 ? 'free' : `$${formatCurrency(deliveryOption.priceCents)} - `

			html += `
			
				<div class="delivery-option js-delivery-options-update" 
				data-product-id="${matchingProduct.id}"
				data-delivery-option-id="${deliveryOption.id}">
					<input type="radio" ${deliveryOption.id === cartItem.deliveryOptionId ? 'checked' : ''}
						class="delivery-option-input"
						name="delivery-option-${matchingProduct.id}"
						>
						<div>
						<div class="delivery-option-date">
								${datetring}
							</div>
							<div class="delivery-option-price">
								${priceString} Shipping
							</div>
						</div>
					</div>
		`
		})

		return html;
	}




	document.querySelectorAll('.js-delete-quantity')
		.forEach((link) => {
			link.addEventListener('click', () => {
				const productId = link.dataset.productId;

				removeFromCart(productId);

				const container = document.querySelector(`.js-cart-item-container-${productId}`);



				container.remove();


				saveToStorage();

			});
		})




	document.querySelectorAll('.update-quantity-link')
		.forEach((update) => {
			update.addEventListener('click', () => {
				const productID = update.dataset.productId;
				const updateCheckoutQuantity = document.querySelector(`.js-display-quantity${productID}`);
				const updateBtn = document.querySelector(`.update-quantity-link-${productID}`);
				const inputField = document.querySelector(`.js-input-${productID}`);
				const saveBtn = document.querySelector(`.update-quantity-link-save-${productID}`);
				inputField.classList.add('displayInlineBlock');
				saveBtn.classList.add('displayInlineBlock');
				updateBtn.classList.add('displayNone');


			})






		})

	document.querySelectorAll('.update-quatity-save')
		.forEach((save) => {
			save.addEventListener('click', () => {

				const productID = save.dataset.productId;
				const updateCheckoutQuantity = document.querySelector(`.js-display-quantity${productID}`);
				const updateBtn = document.querySelector(`.update-quantity-link-${productID}`);
				const inputField = document.querySelector(`.js-input-${productID}`);
				const saveBtn = document.querySelector(`.update-quantity-link-save-${productID}`);
				const newQuantity = Number(inputField.value);
				saveBtn.classList.remove('displayInlineBlock');
				inputField.classList.remove('displayInlineBlock');
				updateBtn.classList.remove('displayNone');
				updateCheckoutQuantity.innerHTML = newQuantity;
				let itemToUpdate;
				cart.forEach((cartItem) => {
					if (productID === cartItem.productId) {
						itemToUpdate = cartItem;
					}


				})
				itemToUpdate.quantity = newQuantity;
				updateCartQuantity2();
				saveToStorage();
				updateItems();

			});
		})



	document.querySelectorAll('.js-delivery-options-update')
		.forEach((element) => {


			element.addEventListener('click', () => {
				const { productId, deliveryOptionId } = element.dataset;
				updateDeliveryOption(productId, deliveryOptionId);
				renderPage();
			})

		})

}

renderPage();
