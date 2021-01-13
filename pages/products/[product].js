import fs from "fs";
import matter from "gray-matter";
import marked from "marked";
import styled from "styled-components";
import Page from "../../components/styled/Page";
import useCart from "../../hooks/useCart";

const AddToCartButton = styled.button`
  height: 2.5rem;
  width: 10rem;
  background: transparent;
  border: none;
  align-content: center;
  background: #82dfd9;
  border-radius: 5px;
  color: white;
  font-size: 20px;
  margin-top: 50px;

  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: flex-end;
`;

const SubTitle = styled.p`
  color: #666;
  font-size: 22px;
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

const ImgAndDescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const StyledSpanForDescription = styled.span`
  color: #999696;
  font-weight: 550;
`;

const StyledImage = styled.img`
  height: 150px;
  width: auto;
  position: absolute;
  right: 100px;
`;

const StyledDivForContentDescription = styled.div`
  width: 50%;
`;

const Product = ({ product: { data, content } }) => {
  const { cart, addItemToCart } = useCart();
  const handleClick = (e) => {
    e.stopPropagation();
    addItemToCart([...product]);
  };
  const html = marked(content);
  return (
    <Page>
      <Title>
        <h1>{data.name}</h1>
      </Title>

      <SubTitle>{data.description}</SubTitle>

      <ImgAndDescriptionContainer>
        <StyledImage src={data.imgUrl}></StyledImage>
        <StyledSpanForDescription></StyledSpanForDescription>
      </ImgAndDescriptionContainer>
      <Price>€{data.price / 100}</Price>
      <StyledDivForContentDescription
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <AddToCartButton onClick={handleClick}>Add to cart</AddToCartButton>
    </Page>
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
