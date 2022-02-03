import React, { useEffect, useState } from "react";
import { ProductForm } from "./ProductForm";
import { useNavigate, Link } from "react-router-dom";

export const Products = ({}) => {
    const [products, setProducts] = useState([]);

    const [addProduct, setAddProduct] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState(null);

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        navigate("/");
    }

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    useEffect(() => {
        window.axios
            .get(
                `/api/users/
        ${user.id}/products`
            )
            .then((response) => setProducts(response.data));
    }, []);

    const newProduct = (product) => {
        setProducts([...products.filter((p) => p.id !== product.id), product]);
        setAddProduct(false);
    };

    const editProduct = (product) => {
        setProducts([...products.filter((p) => p.id !== product.id), product]);
        setSelectedProduct(null);
    };

    const deleteProduct = (product) =>
        window.axios
            .delete(`/api/products/${product.id}`)
            .then(() =>
                setProducts([...products.filter((p) => p.id !== product.id)])
            );

    return (
        <div className="container">
            <h1>Productos</h1>
            <p>
                Usuario: {user.email} <a onClick={logout}>Salir</a>
            </p>
            {!addProduct && selectedProduct === null && (
                <a onClick={() => setAddProduct(true)}>Nuevo Producto</a>
            )}
            {addProduct && <ProductForm onSubmit={newProduct} />}
            {selectedProduct !== null && (
                <ProductForm product={selectedProduct} onSubmit={editProduct} />
            )}

            {selectedProduct === null && !addProduct && (
                <div className="section">
                    <h3>Productos creados</h3>
                    <ul>
                        {products.map((p) => (
                            <li key={p.id}>
                                <span>{p.name}</span>
                                <a onClick={() => setSelectedProduct(p)}>
                                    Editar
                                </a>
                                <a onClick={() => deleteProduct(p)}>Eliminar</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
