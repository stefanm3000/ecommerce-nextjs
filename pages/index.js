import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import styled from "styled-components";
import UnstyledLink from "../components/styled/UnstyledLink";
import useCart from "../hooks/useCart";
import { useContext } from "react";
import { Context } from "../context/Cart";
import { IoAddCircleOutline } from "react-icons/io5";

const Container = styled.div`
  background: white;
  padding: 1rem 1.9rem;
  min-height: 220px;
  border-radius: 5px;
  position: relative;
  transition: transform 0.4s;

  &:hover {
    transform: scale(1.024);
  }
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.7rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const Price = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 1.3rem;
`;

const AddToCartButtonIcon = styled(IoAddCircleOutline)`
font-size: 2rem
`;

const AddToCartButton = styled.button`
height: 2.5rem;
width: 4rem;
background: transparent;
border: none;
position: absolute;
  bottom: 10px;
  left: 10px;

&:hover {
  cursor: pointer;
}
`


const renderProduct = (product, addItemToCart) => {
  const handleClick = (e) => {
    e.stopPropagation();
    addItemToCart(product);
  };
  return (
    <Link href={product.slug} key={product.id}>
      <UnstyledLink>
        <Container>
          <h1>{product.name}</h1>
          <p>{product.description}</p>

          <AddToCartButton onClick={handleClick}>
            <AddToCartButtonIcon />
          </AddToCartButton>

          <Price>€{product.price / 100}</Price>
        </Container>
      </UnstyledLink>
    </Link>
  );
};

const HomePage = (props) => {
  const { cart, addItemToCart } = useCart();
  console.log(cart);

  return (
    <ProductsContainer>
      {props.products.map((product) => renderProduct(product, addItemToCart))}
    </ProductsContainer>
  );
};

export const getStaticProps = async () => {
  const directory = `${process.cwd()}/content`;
  const filenames = fs.readdirSync(directory);

  const products = filenames.map((filename) => {
    //first read the file from filesystem
    const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();

    //then get out frontmatter
    const { data } = matter(fileContent);

    //then return the name, slug
    const slug = `/products/${filename.replace(".md", "")}`;
    const product = {
      ...data,
      slug: slug,
    };

    return product;
  });
  return {
    props: {
      products: products,
    },
  };
};

export default HomePage;
