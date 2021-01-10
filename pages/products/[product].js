import fs from "fs";
import matter from "gray-matter";
import marked from "marked";
import styled from "styled-components";

const Container = styled.div`
  background: white;
  border-radius: 5px;
  padding: 1rem 2rem;
  margin: 1rem 0;
  min-height: 300px;
`;

const Title = styled.div`
  display: flex;
  align-items: flex-end;
`;

const SubTitle = styled.p`
  padding: 0.7rem 1rem;
  color: #666;
`;

const Price = styled.span`
  font-size: 1.2rem;
  padding: 0.5rem;
  font-weight: 800;
  border-radius: 5px;
  background: #2cdb5b;
  color: white;
  margin-bottom: 0.5rem;
  display: inline-block;
`;

const Product = ({ product: { data, content } }) => {
  const html = marked(content);
  return (
    <Container>
      <Title>
        <h1>{data.name}</h1>
        <SubTitle>{data.description}</SubTitle>
      </Title>
      <Price>€{data.price / 100}</Price>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Container>
  );
};

export const getStaticPaths = () => {
  // tell it which product pages to make
  const directory = `${process.cwd()}/content`;
  const filenames = fs.readdirSync(directory);

  const paths = filenames.map((filename) => {
    return {
      params: {
        product: filename.replace(".md", ""),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const productName = context.params.product;
  const filepath = `${process.cwd()}/content/${productName}.md`;
  const fileContent = fs.readFileSync(filepath).toString();
  const { data, content } = matter(fileContent);

  return {
    props: {
      product: {
        data,
        content,
      },
    },
  };
};

export default Product;
