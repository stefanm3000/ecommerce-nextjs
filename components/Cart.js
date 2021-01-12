import styled from "styled-components";
import { GrClose } from "react-icons/gr";
import useCart from "../hooks/useCart";

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  width: 250px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  transform: translateX(${(props) => (props.isOpen ? "0" : "100%")});
  transition: transform 0.28s ease-in-out;
`;

const XContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Xcomp = styled(GrClose)`
  font-size: 2.3rem;
  padding: 1rem;

  &:hover {
    cursor: pointer;
  }
`;

const Content = styled.div`
  padding: 1rem 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 450;
  border-bottom: 1px solid lightgray;
`;

const Item = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  margin-bottom: 0.2rem;
`;

const Ul = styled.ul`
  padding: 0;
`;

const Total = styled.p`
  padding: 0;
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 550;
`;

const BuyButton = styled.button`
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

const Cart = () => {
  const { cart, isOpen, openCart, closeCart } = useCart();
  const handleClick = () => {
    closeCart();
  };

  return (
    <Container isOpen={isOpen}>
      <XContainer>
        <Xcomp onClick={handleClick} />
      </XContainer>
      <Content>
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
          <span>123</span>
        </Total>
        <BuyButton>Checkout</BuyButton>
      </Content>
    </Container>
  );
};

export default Cart;
