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
  height: 100%;
  width: 1.8rem;
  transition: transform 0.4s;

  &:hover {
    cursor: pointer;
    transform: scale(1.3);
  }
`;

const Navbar = () => {
  const { openCart } = useCart();

  const handleClick = () => {
    openCart();
  };
  return (
    <Nav>
      <NavContainer>
        <Link href="/">
          <UnstyledLink>The Shop</UnstyledLink>
        </Link>
        <ShopCart onClick={handleClick} />
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
