/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useContext } from 'react';
import { Store } from '../utils/Store';

export default function ProductItem({ product }) {
  const { state, dispatch } = useContext(Store);
  const handleAddToCart = () => {
    const existItem = state.cart.cartItems.find(
      item => item.slug === product.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    //   console.log(state, 'state');
    if (quantity > product.countInStock) {
      alert('Sorry. Product is Out of Stock');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <a>
          <img src={product.image} alt={product.name} />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
