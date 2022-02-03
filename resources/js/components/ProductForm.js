import React, { useState } from "react";

export const ProductForm = ({ product, onSubmit }) => {
    const [productName, setProductName] = useState(product?.name || "");
    const [productDescription, setProductDescription] = useState(
        product?.description || ""
    );

    const user = JSON.parse(localStorage.getItem("user"));

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = JSON.stringify({
            name: productName,
            description: productDescription,
        });

        const request = product
            ? window.axios.put(`/api/products/${product.id}`, body)
            : window.axios.post(`/api/users/${user.id}/products`, body);
        request
            .then((response) => onSubmit(response.data))
            .catch((err) => console.log(err.response));
    };

    return (
        <div className="section">
            <h2>{!product ? "Crear" : "Editar"} Producto</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre</label>
                    <input
                        type="text"
                        onChange={(e) => setProductName(e.target.value)}
                        value={productName}
                    />
                </div>
                <div className="form-group">
                    <label>Descripci&oacute;n</label>
                    <textarea
                        type="text"
                        onChange={(e) => setProductDescription(e.target.value)}
                        value={productDescription}
                    />
                </div>
                <div className="form-group">
                    <button>{!product ? "Crear" : "Editar"}</button>
                </div>
            </form>
        </div>
    );
};
