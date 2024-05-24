async function productsList () {
    const conexao = await fetch("http://localhost:3000/products")
    const conexaoConvertida = await conexao.json();
    
    return conexaoConvertida;
}

async function inserirProduct (name, price, image) {
    const conexao = await fetch ("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            price: price,
            image: image
        })
    });

    // Tratamento de erros
    if(!conexao.ok){
        throw new Error("Não foi possível adicionar o produto!");
    }

    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

async function deleteProduct (id){
    const conexao = await fetch (`http://localhost:3000/products/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    });

    // Tratamento de erros
    if(!conexao.ok){
        throw new Error("Não foi possível remover o produto!");
    }

    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

export const servicesProducts = {
    productsList,
    inserirProduct,
    deleteProduct
};



