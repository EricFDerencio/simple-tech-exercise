function createProductCard({
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
  const colDiv = document.createElement("div");
  colDiv.className = "col mb-5";
  colDiv.style = "cursor: pointer";  //editar o padding da div por uma margin para ajustar o espaço do click do mouse
  colDiv.onclick = function () {
    window.location.href = `../product.html?productId=${id}`;
  };

  const cardDiv = document.createElement("div");
  cardDiv.className = "card h-100";

  const badgeDiv = document.createElement("div");
  badgeDiv.className = "badge bg-dark text-white position-absolute";
  badgeDiv.style.top = "0.5rem";
  badgeDiv.style.right = "0.5rem";
  badgeDiv.textContent = badgeText;

  const img = document.createElement("img");
  img.className = "card-img-top";
  img.src = imageUrl;
  img.alt = imageAlt;

  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.className = "card-body p-4";

  const textCenterDiv = document.createElement("div");
  textCenterDiv.className = "text-center";

  const productNameH5 = document.createElement("h5");
  productNameH5.className = "fw-bolder";
  productNameH5.textContent = productName;

  const reviewsDiv = document.createElement("div");
  reviewsDiv.className =
    "d-flex justify-content-center small text-warning mb-2";
  for (let i = 0; i < reviews; i++) {
    const starDiv = document.createElement("div");
    starDiv.className = "bi-star-fill";
    reviewsDiv.appendChild(starDiv);
  }

  const originalPriceSpan = document.createElement("span");
  originalPriceSpan.className = "text-muted text-decoration-line-through";
  originalPriceSpan.textContent = originalPrice;

  const discountedPriceText = document.createTextNode(` ${discountedPrice}`);

  const cardFooterDiv = document.createElement("div");
  cardFooterDiv.className = "card-footer p-4 pt-0 border-top-0 bg-transparent";

  const buttonContainerDiv = document.createElement("div");
  buttonContainerDiv.className = "text-center";

  const button = document.createElement("button");
  button.className = "btn btn-outline-dark mt-auto";

  /* MÉTODO PARA ADICIONAR AO CARRINHO */
  button.onclick = (event) => {
    event.stopPropagation(); // Impede que o clique propague para o colDiv
    addToCart(id);
  };
  button.textContent = buttonText;

  textCenterDiv.appendChild(productNameH5);
  textCenterDiv.appendChild(reviewsDiv);
  textCenterDiv.appendChild(originalPriceSpan);
  textCenterDiv.appendChild(discountedPriceText);

  cardBodyDiv.appendChild(textCenterDiv);

  buttonContainerDiv.appendChild(button);
  cardFooterDiv.appendChild(buttonContainerDiv);

  cardDiv.appendChild(badgeDiv);
  cardDiv.appendChild(img);
  cardDiv.appendChild(cardBodyDiv);
  cardDiv.appendChild(cardFooterDiv);

  colDiv.appendChild(cardDiv);

  return colDiv;
}

/* IMPLEMENTAR MÉTODO DE ADICIONAR AO CARRINHO */
function addToCart(id) {
  getProducts()
    .then((products) => {
      const product = products.find((item) => item.id === id);

      if (product) {
        let cartList = JSON.parse(localStorage.getItem("cartList")) || [];
        const existingProduct = cartList.find((item) => item.id === id);

        if (existingProduct) {
          // Incrementa a quantidade do produto existente
          existingProduct.quantity += 1;
        } else {
          // Adiciona o novo produto com quantidade 1
          product.quantity = 1;
          cartList.push(product);
        }

        localStorage.setItem("cartList", JSON.stringify(cartList));
        alert("Produto adicionado ao carrinho com sucesso!");
        updateCartCounter(); // Atualiza o contador
      } else {
        alert("Produto não encontrado!");
      }
    })
    .catch((error) => {
      console.error("Erro ao adicionar o produto ao carrinho:", error);
      alert("Ocorreu um erro ao adicionar o produto ao carrinho.");
    });
}

export function updateCartCounter() {
  const cartList = JSON.parse(localStorage.getItem("cartList")) || [];
  const cartCount = cartList.length; // Conta o número de itens no carrinho
  const cartCounterSpan = document.querySelector("#button-cart .badge"); // Seleciona o span
  cartCounterSpan.textContent = cartCount; // Atualiza o número exibido
}

/* Buscar produtos e exibir em tela */
export async function getProducts() {
  try {
    const response = await fetch('../products.json'); // Faz o fetch do arquivo JSON
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON');
    }
    const productsArray = await response.json(); // Converte o conteúdo para um array de objetos
    return productsArray; // Retorna o array de objetos
  } catch (error) {
    console.error('Erro:', error);
    return []; // Retorna um array vazio em caso de erro
  }
}

function showProductScreen() {
  getProducts()
  .then(products =>{
    let destino = document.getElementById("products-container");

    products.forEach(product => {
      let productCard = createProductCard(product);
      destino.appendChild(productCard);
    });
  })
  .catch(error => {
    console.error("Erro ao carregar os produtos:", error);
  });
}
showProductScreen();
updateCartCounter();
