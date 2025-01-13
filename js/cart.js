updateCartCounter();
renderCartItems();
somarPrecoTotal();

function createCartItemTemplate({
  id,
  badgeText,
  imageUrl,
  imageAlt,
  productName,
  reviews,
  originalPrice,
  discountedPrice,
  buttonText,
  quantity, // Recebendo a quantidade do item
}) {
  const cartItemRow = document.createElement("div");
  cartItemRow.className = "row border-bottom py-3 align-items-center";

  // Imagem do Produto
  const imageCol = document.createElement("div");
  imageCol.className = "col-2";
  const productImage = document.createElement("img");
  productImage.src = imageUrl;
  productImage.alt = imageAlt || "Imagem do Produto";
  productImage.className = "img-fluid rounded";
  imageCol.appendChild(productImage);

  // Detalhes do Produto
  const detailsCol = document.createElement("div");
  detailsCol.className = "col-6";

  const badge = document.createElement("span");
  badge.className = "badge bg-primary text-white mb-2";
  badge.textContent = badgeText;
  detailsCol.appendChild(badge);

  const productNameEl = document.createElement("h5");
  productNameEl.textContent = productName;
  detailsCol.appendChild(productNameEl);

  const reviewsDiv = document.createElement("div");
  reviewsDiv.className = "d-flex small text-warning mb-2";

  // Adicionar estrelas de avaliação
  for (let i = 0; i < reviews; i++) {
    const starIcon = document.createElement("i");
    starIcon.className = "bi bi-star-fill";
    reviewsDiv.appendChild(starIcon);
  }
  detailsCol.appendChild(reviewsDiv);

  const priceInfo = document.createElement("div");
  priceInfo.innerHTML = `
    <span class="text-muted text-decoration-line-through">${originalPrice}</span>
    <span class="text-danger fw-bold ms-2">${discountedPrice}</span>
  `;
  detailsCol.appendChild(priceInfo);

  // Quantidade e botão de remoção
  const actionCol = document.createElement("div");
  actionCol.className = "col-4 d-flex align-items-center justify-content-end";

  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.value = quantity || 1; // Definindo a quantidade, se disponível
  quantityInput.min = 1;
  quantityInput.className = "form-control text-center me-3";
  quantityInput.style.maxWidth = "4rem";
  quantityInput.addEventListener('change',()=>{
    const cartItems = JSON.parse(localStorage.getItem("cartList")) || [];
    const updatedCartItems = cartItems.map(item => {
      if (item.id === id) {
        item.quantity = parseInt(quantityInput.value);
      }
      return item;
    });
    localStorage.setItem("cartList", JSON.stringify(updatedCartItems));
    somarPrecoTotal();
  })
  actionCol.appendChild(quantityInput);

  const removeButton = document.createElement("button");
  removeButton.className = "btn btn-outline-danger";
  removeButton.textContent = "Remover";
  removeButton.onclick = () =>{ 
    removeFromCart(id); 
    somarPrecoTotal();
  } 
  actionCol.appendChild(removeButton);

  cartItemRow.appendChild(imageCol);
  cartItemRow.appendChild(detailsCol);
  cartItemRow.appendChild(actionCol);

  return cartItemRow;
}

function somarPrecoTotal() {
  const cartItems = JSON.parse(localStorage.getItem("cartList")) || [];
  let total = 0;

  cartItems.forEach((item) => {
    const priceString = item.discountedPrice.replace("R$", "").trim();
    const price = parseFloat(priceString) || 0;

    total += price * (item.quantity || 1); // Quantidade padrão é 1
  });

  document.getElementById("ValorCompra").innerHTML = `R$ ${total.toFixed(2)}`; // Exibe com 2 casas decimais
}



// Função para remover item do carrinho
function removeFromCart(productId) {
  const cartItems = JSON.parse(localStorage.getItem("cartList")) || [];
  const updatedCartItems = cartItems.filter(item => item.id !== productId);
  localStorage.setItem("cartList", JSON.stringify(updatedCartItems));
  renderCartItems();
  updateCartCounter();
}

// Atualizar contador do carrinho
function updateCartCounter() {
  const cartItems = JSON.parse(localStorage.getItem("cartList")) || [];
  const cartCounter = document.querySelector("#button-cart .badge");
  cartCounter.textContent = cartItems.length;
}

function renderCartItems() {
  const cartContainer = document.querySelector("#cart-container");
  cartContainer.innerHTML = ""; // Limpa o conteúdo anterior

  const cartItems = JSON.parse(localStorage.getItem("cartList")) || [];

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>O carrinho está vazio.</p>";
    return;
  }

  cartItems.forEach((item) => {
    let template = createCartItemTemplate(item);
    cartContainer.appendChild(template);
  });
}

