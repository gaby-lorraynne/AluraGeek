import { servicesProducts } from "../services/products-services.js";

const productContainer = document.querySelector("[data-product]");
const formulario = document.querySelector("[data-formulario]");


function createElement(name, price, image, id){
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
    <div class="content__myProducts__cards__products" >
        <div class="content__myProducts__cards__products__content">
            <img src="${image}" alt="${name}">
            <span>${name}</span>
            <div class="content__myProducts__cards__products__preco">
                <span>$ ${price} </span>
                <button class="delete-button" data-id="${id}">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </div>
        </div>
    </div>`
   
    
    productContainer.appendChild(card);
    return card;
}

const render = async () => {
    try {
        const listaProducts = await servicesProducts.productsList();
        
        if(listaProducts.length == 0){
            const mensagemLista = document.createElement("p");
            mensagemLista.textContent = "Nenhum produto cadastrado!";
            mensagemLista.classList.add("mensagemLista");
            productContainer.appendChild(mensagemLista);
        }else{
            listaProducts.forEach(product => {
                productContainer.appendChild(
                    createElement(
                        product.name,
                        product.price,
                        product.image,
                        product.id
                    )
                )
            });
        }

    } catch (error) {
        console.log(error)
    }
}


async function cadastrarProducts(evento){
    evento.preventDefault();

    const nome = document.querySelector("[data-nome]").value;
    const valor = document.querySelector("[data-valor]").value;
    const imagem = document.querySelector("[data-imagem]").value;
    

    // Tratando erros que podem acontecer ao inserir o produto
    try{
        await servicesProducts.inserirProduct(nome, valor, imagem);
        
    }catch (e){
        alert(e);
    }
}

formulario.addEventListener("submit", evento => cadastrarProducts(evento));

async function deletarProduct(id) {
    // Tratando erros que podem acontecer ao deletar o produto
    try {
        await servicesProducts.deleteProduct(id);
        
    } catch (e) {
        alert(e);
    }
}

// Adiciona o ouvinte de eventos ao contêiner pai
productContainer.addEventListener("click", evento => {
    if (evento.target.closest(".delete-button")) {
        const id = evento.target.closest(".delete-button").dataset.id;
        deletarProduct(id);
    }
});



render();