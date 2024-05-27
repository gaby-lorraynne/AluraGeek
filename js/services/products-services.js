async function productsList () {
    const conexao = await fetch("https://alura-geek-tawny.vercel.app/products")
    const conexaoConvertida = await conexao.json();
    
    return conexaoConvertida;
}

async function inserirProduct (name, price, image) {
    const conexao = await fetch ("https://alura-geek-tawny.vercel.app/products", {
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
    const conexao = await fetch (`https://alura-geek-tawny.vercel.app/products/${id}`, {
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



