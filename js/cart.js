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
    quantityInput.value = 1;
    quantityInput.min = 1;
    quantityInput.className = "form-control text-center me-3";
    quantityInput.style.maxWidth = "4rem";
    actionCol.appendChild(quantityInput);
  
    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-outline-danger";
    removeButton.textContent = "Remover";
    removeButton.onclick = () => removeFromCart(id); // Função a ser implementada
    actionCol.appendChild(removeButton);
  

    cartItemRow.appendChild(imageCol);
    cartItemRow.appendChild(detailsCol);
    cartItemRow.appendChild(actionCol);
  
    return cartItemRow;
  }
  
  // Função para remover item do carrinho
  function removeFromCart(productId) {
    alert(`Produto com ID ${productId} foi removido do carrinho!`);
    // Aqui você pode implementar a lógica para atualizar o carrinho
  }




  
  const cartContainer = document.getElementById("cart-container");
  const cartItem = createCartItemTemplate(exampleProduct);
  cartContainer.appendChild(cartItem);
  