import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import styled from "styled-components";
import UnstyledLink from "../components/styled/UnstyledLink";

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
  bottom: 10px;
  right: 10px;
  font-size: 1.3rem;
`;

const renderProduct = (product) => {
  return (
    <Link href={product.slug}>
      <UnstyledLink>
        <Container>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <Price>€{product.price / 100}</Price>
        </Container>
      </UnstyledLink>
    </Link>
  );
};

const HomePage = (props) => {
  return (
    <ProductsContainer>{props.products.map(renderProduct)}</ProductsContainer>
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
