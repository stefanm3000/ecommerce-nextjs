import Link from "next/link";
import styled from "styled-components";
import UnstyledLink from "./styled/UnstyledLink";
import { AiOutlineShoppingCart } from "react-icons/ai";
import useCart from "../hooks/useCart";

const Nav = styled.nav`
  background: white;
  padding: 1.8rem;
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  font-size: 1.3rem;
  display: flex;
  justify-content: space-between;
  height: 2rem;
  align-items: center;
`;

const ShopCart = styled(AiOutlineShoppingCart)`
  height: 2rem;
  width: 1.8rem;
  transition: transform 0.4s;
  grid-column: 1;
  grid-row: 1;

  &:hover {
    cursor: pointer;
    transform: scale(1.3);
  }
`;

const NumberOnCart = styled.div`
  border-radius: 50%;
  background: red;
  width: 15px;
  height: 15px;
  font-size: 0.85rem;
  color: white;
  display: flex;
  justify-content: center;
  align-content: center;
  z-index: 3;
  grid-column: 1;
  grid-row: 1;
`;

const ShopCartContainer = styled.div`
  display: grid;
`;

const Navbar = () => {
  const { openCart, cart } = useCart();
  const handleClick = () => {
    openCart();
  };
  return (
    <Nav>
      <NavContainer>
        <Link href="/">
          <UnstyledLink>The Shop</UnstyledLink>
        </Link>
        <ShopCartContainer>
          <ShopCart onClick={handleClick} />
          {cart.length ? (
            <>
              <NumberOnCart>{cart.length}</NumberOnCart>
            </>
          ) : null}
        </ShopCartContainer>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
