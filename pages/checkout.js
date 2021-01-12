import Page from "../components/styled/Page";
import useCart from "../hooks/useCart";
import styled from "styled-components";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 450;
  border-bottom: 1px solid lightgray;
`;

export const Item = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  margin-bottom: 0.2rem;
`;

export const Ul = styled.ul`
  padding: 0;
`;

export const Total = styled.p`
  padding: 0;
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 550;
`;

export const BuyButton = styled.button`
  background: transparent;
  font-size: 1.5rem;
  color: white;
  outline: none;
  border: none;
  background: linear-gradient(to right, #74ebd5, #acb6e5);
  border-radius: 3px;
  width: 100%;
  padding: 1.3rem;
  font-weight: 600;

  &:hover {
    cursor: pointer;
  }
`;

const Checkout = () => {
  const { cart, total } = useCart();

  const processPayment = async () => {
    const url = "/.netlify/functions/charge-card";
    const newCart = cart.map(({ id, quantity }) => ({
      id,
      quantity,
    }));

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    const { data } = await axios.post(url, { cart: newCart });
    await stripe.redirectToCheckout({ sessionId: data.id });
  };
  return (
    <Page>
      <div>
        <h2>Checkout:</h2>
        {cart.length ? (
          <div>
            <Title>Your items:</Title>
            <Ul>
              {cart.map((item) => {
                return (
                  <Item>
                    <span>
                      {item.quantity} x {item.name}
                    </span>
                    <span>€{item.price / 100}</span>
                  </Item>
                );
              })}
            </Ul>
            <Total>
              <span>Total: </span>
              <span>€{total / 100}</span>
            </Total>
            <BuyButton onClick={processPayment}>Checkout</BuyButton>
          </div>
        ) : (
          <p>Whoops! There are no items in your cart currently.</p>
        )}
      </div>
    </Page>
  );
};

export default Checkout;
