import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import './cart.css';

const Cart = () => {
  const { myCart, total, addToCart, setTotal } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    setTotal(0);
    addToCart([{}]);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <>
      <section className='cart-container'>
        <div className='cart-header'>Checkout:</div>
        <div className='cart-items'>
          {myCart.slice(1).map(item => {
            return (
              <div className='cart-item'>
                <img
                  src={item.imageUrl}
                  className='cart-item-img'
                  alt='error'
                />
                {item.name} : {item.price}$
              </div>
            );
          })}
          <div className='cart-total'>TOTAL: {total}$</div>
        </div>
        <button className='cart-checkout' onClick={handleCheckout}>
          Done
        </button>
        <button className='cart-gohome' onClick={handleGoHome}>
          BACK
        </button>
      </section>
    </>
  );
};

export default Cart;
