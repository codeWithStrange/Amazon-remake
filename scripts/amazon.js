import {products} from './myProduct.js';
import {cart} from './myCart.js';




let productData = ''
products.forEach( (product) => {
	productData += `
	<div class="product-container">
	<div class="product-image-container">
		<img class="product-image"
			src="${product.image}">
	</div>

	<div class="product-name limit-text-to-2-lines">
	${product.name}
	</div>

	<div class="product-rating-container">
		<img class="product-rating-stars"
			src="images/ratings/rating-${product.rating.stars*10}.png">
		<div class="product-rating-count link-primary">
			${product.rating.count}
		</div>
	</div> 

	<div class="product-price">
		$${(product.priceCents/100).toFixed(2)}
	</div>

	<div class="product-quantity-container">
		<select class="js-quantity-selector-${product.id}">
			<option selected value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
			<option value="6">6</option>
			<option value="7">7</option>
			<option value="8">8</option>
			<option value="9">9</option>
			<option value="10">10</option>
		</select>
	</div>

	<div class="product-spacer"></div>

	<div class="added-to-cart-${product.id} added-to-cart">
		<img src="images/icons/checkmark.png">
		Added
	</div>

	<button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
		Add to Cart
	</button>
</div>
	`
})



let timeOutID;
document.querySelector('.js-products-grid') 
.innerHTML = productData;
document.querySelectorAll('.js-add-to-cart')


	.forEach((button)=> {

			button.addEventListener('click', ()=> {
				let productId = button.dataset.productId;
				document.querySelectorAll(`.added-to-cart-${productId}`)
					.forEach((Add)=> {
						Add.classList.add('added-visible')
					})
					clearTimeout(timeOutID);
					timeOutID =		setTimeout(()=> {
						document.querySelectorAll(`.added-to-cart-${productId}`)
					.forEach((Add)=> {
						Add.classList.remove('added-visible')
					})
					}, 2000)

				
				let matchingItem;
			
			let	selectedQuantity=	Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
				cart.forEach((item)=>{

					if (productId===item.productId) {
							matchingItem=item;
						}

					});
					if (matchingItem) {
						matchingItem.quantity += selectedQuantity ;
					}

					else{
						cart.push({
							productId,
							 quantity : selectedQuantity
								})
					}
					let cartQuantity =0;
					cart.forEach((item)=>{
						cartQuantity+=item.quantity
					})
					console.log(cart);

					
					document.querySelector('.js-cart-Quatity')
					.innerHTML=cartQuantity;

			})

	});