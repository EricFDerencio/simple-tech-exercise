function createProductDetailsWithImage(product) {
  const container = document.createElement("div");
  container.className = "row";

  const imageColDiv = document.createElement("div");
  imageColDiv.className = "col-md-6";

  const productImage = document.createElement("img");
  productImage.className = "card-img-top mb-5 mb-md-0";
  productImage.src = product.imageUrl;
  productImage.alt = product.imageAlt || "Imagem do produto";
  imageColDiv.appendChild(productImage);

  container.appendChild(imageColDiv);

  const detailsColDiv = document.createElement("div");
  detailsColDiv.className = "col-md-6";

  const idDiv = document.createElement("div");
  idDiv.className = "small mb-1";
  idDiv.textContent = `ID: ${product.id}`;
  detailsColDiv.appendChild(idDiv);

  const productTitle = document.createElement("h1");
  productTitle.className = "display-5 fw-bolder";
  productTitle.textContent = product.productName;
  detailsColDiv.appendChild(productTitle);

  const priceDiv = document.createElement("div");
  priceDiv.className = "fs-5 mb-5";

  const originalPrice = document.createElement("span");
  originalPrice.className = "text-decoration-line-through";
  originalPrice.textContent = product.originalPrice;
  priceDiv.appendChild(originalPrice);

  const discountedPrice = document.createElement("span");
  discountedPrice.textContent = ` ${product.discountedPrice}`;
  priceDiv.appendChild(discountedPrice);

  detailsColDiv.appendChild(priceDiv);

  const description = document.createElement("p");
  description.className = "lead";
  description.textContent =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium at dolorem quidem modi. Nam sequi consequatur obcaecati excepturi alias magni, accusamus eius blanditiis delectus ipsam minima ea iste laborum vero?";
  detailsColDiv.appendChild(description);

  const actionDiv = document.createElement("div");
  actionDiv.className = "d-flex";

  const quantityInput = document.createElement("input");
  quantityInput.className = "form-control text-center me-3";
  quantityInput.id = "inputQuantity";
  quantityInput.type = "number";
  quantityInput.value = "1";
  quantityInput.style.maxWidth = "3rem";
  actionDiv.appendChild(quantityInput);

  const addToCartButton = document.createElement("button");
  addToCartButton.className = "btn btn-outline-dark flex-shrink-0";
  addToCartButton.type = "button";
  addToCartButton.onclick = () => addToCart(product.id);

  const cartIcon = document.createElement("i");
  cartIcon.className = "bi-cart-fill me-1";
  addToCartButton.appendChild(cartIcon);

  const buttonText = document.createTextNode(product.buttonText);
  addToCartButton.appendChild(buttonText);

  actionDiv.appendChild(addToCartButton);

  detailsColDiv.appendChild(actionDiv);

  container.appendChild(detailsColDiv);

  return container;
}

/* IMPLEMENTAR MÉTODO DE ADICIONAR AO CARRINHO */
const addToCart = (productId) => {
  const quantityInput = document.querySelector("#inputQuantity");
  const quantity = parseInt(quantityInput.value);

  if (isNaN(quantity) || quantity <= 0) {
    alert("Por favor, insira uma quantidade válida.");
    return;
  }

  getProducts()
    .then((products) => {
      const product = products.find((item) => item.id === productId);

      if (product) {
        // Aqui você pode criar ou atualizar a lógica para armazenar o carrinho
        const cart = JSON.parse(localStorage.getItem("cartList")) || [];

        const existingProduct = cart.find((item) => item.id === product.id);

        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          cart.push({
            ...product,
            quantity,
          });
        }

        localStorage.setItem("cartList", JSON.stringify(cart));
        updateCartCounter();
        alert(`Adicionado ${quantity} unidade(s) de "${product.productName}" ao carrinho!`);
      } else {
        console.error("Produto não encontrado para o ID:", productId);
      }
    })
    .catch((error) => {
      console.error("Erro ao adicionar ao carrinho:", error);
    });
};

import { updateCartCounter } from "./scripts.js";

import { getProducts } from "./scripts.js"; // Ajuste o caminho de acordo com sua estrutura de pastas

const params = new URLSearchParams(window.location.search);
const returnId = params.get("productId");
/* Implementar lógica para buscar o produto pelo id e chamar a função para colocar ele em tela. */
function showProductScreen() {
  getProducts()
    .then((products) => {
      const destino = document.querySelector(".product-container");

      const product = products.find((item) => item.id === parseInt(returnId)); 
      if (product) {
        const productCard = createProductDetailsWithImage(product);
        destino.appendChild(productCard);
      } else {
        console.error("Produto não encontrado para o ID:", returnId);
      }
    })
    .catch((error) => {
      console.error("Erro ao carregar os produtos:", error);
    });
}

showProductScreen();
updateCartCounter();

