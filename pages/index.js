import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import styled from "styled-components";
import UnstyledLink from "../components/styled/UnstyledLink";
import useCart from "../hooks/useCart";

const ImgAndDescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 686px) {
    height: 6rem;
    margin-bottom: 20%;
  }
`;

const StyledSpanForDescription = styled.span`
  color: #999696;
  font-weight: 550;
`;

const StyledImage = styled.img`
  height: 80px;
  width: auto;
`;

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

  @media (max-width: 768px) {
    margin: 0 20px;
  }
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.7rem;
  padding-top: 1rem;
  padding-bottom: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Price = styled.div`
  position: absolute;
  bottom: 30px;
  right: 2rem;
  font-size: 1.3rem;
`;

const AddToCartButton = styled.button`
  height: 2.5rem;
  width: 10rem;
  background: transparent;
  border: none;
  position: absolute;
  bottom: 20px;
  left: 20px;
  align-content: center;
  background: #82dfd9;
  border-radius: 5px;
  color: white;
  font-size: 20px;

  &:hover {
    cursor: pointer;
  }
`;

const RemoveItemFromCartButton = styled.button`
  height: 2.5rem;
  width: 2rem;
  background: transparent;
  border: none;
  position: absolute;
  bottom: 20px;
  left: 12rem;
  align-content: center;
  border-radius: 5px;
  color: white;
  font-size: 20px;
  border: 2px solid red;
  color: red;

  &:hover {
    cursor: pointer;
  }
`;

const renderProduct = (
  product,
  addItemToCart,
  removeOneFromQuantity,
  removeItemFromCart
) => {
  const handleClick = (e) => {
    e.stopPropagation();
    addItemToCart(product);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    removeOneFromQuantity(product);
  };

  const { cart } = useCart();

  return (
    <Link href={product.slug} key={product.id}>
      <UnstyledLink>
        <Container>
          <h1>{product.name}</h1>
          <ImgAndDescriptionContainer>
            <StyledImage src={product.imgUrl} />
            <StyledSpanForDescription>
              {product.description}
            </StyledSpanForDescription>
          </ImgAndDescriptionContainer>
          <AddToCartButton onClick={handleClick}>Add to cart</AddToCartButton>
          {cart.map((item) => {
            if (item.id === product.id) {
              return (
                <RemoveItemFromCartButton
                  onClick={handleRemove}
                  key={product.id}
                >
                  -
                </RemoveItemFromCartButton>
              );
            }
          })}
          <Price>€{product.price / 100}</Price>
        </Container>
      </UnstyledLink>
    </Link>
  );
};

const HomePage = (props) => {
  const {
    addItemToCart,
    removeOneFromQuantity,
    removeItemFromCart,
  } = useCart();

  return (
    <ProductsContainer>
      {props.products.map((product) =>
        renderProduct(
          product,
          addItemToCart,
          removeOneFromQuantity,
          removeItemFromCart
        )
      )}
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
