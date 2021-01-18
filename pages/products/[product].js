import fs from "fs";
import matter from "gray-matter";
import marked from "marked";
import styled from "styled-components";
import Page from "../../components/styled/Page";
import useCart from "../../hooks/useCart";
import Carousel from "../../components/Carousel";

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

  @media (max-width: 768px) {
    font-size: 20px;
    width: 50%;
  }
`;

const Price = styled.span`
  font-size: 1.2rem;
  padding: 0.5rem;
  font-weight: 800;
  border-radius: 5px;
  background: #2cdb5b;
  color: white;
  bottom: 8px;
  right: 2rem;
  font-size: 1.3rem;
`;

const ImgAndDescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  padding-top: 2rem;
`;

const StyledDivForContentDescription = styled.div`
  width: 80%;
  padding-top: 1rem;
`;

const RemoveOneFromQuantityButton = styled.button`
  height: 2.5rem;
  width: 5rem;
  border-radius: 5px;
  color: white;
  font-size: 20px;
  margin-top: 50px;
  background: transparent;
  border: 2px solid red;
  color: red;
  margin-left: 1rem;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

const Product = ({ product: { data, content } }) => {
  const { addItemToCart, removeOneFromQuantity, cart } = useCart();
  const handleClick = (e) => {
    e.stopPropagation();
    addItemToCart(data);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    removeOneFromQuantity(data);
  };
  const html = marked(content);
  return (
    <Page>
      <Title>
        <h1>{data.name}</h1>
      </Title>

      <SubTitle>{data.description}</SubTitle>

      <ImgAndDescriptionContainer
        style={{
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Carousel
          
          imgUrl={data.imgUrl}
          imgUrl2={data.imgUrl2}
          imgUrl3={data.imgUrl3}
        />
      </ImgAndDescriptionContainer>
      <Price>€{data.price / 100}</Price>
      <StyledDivForContentDescription
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <AddToCartButton onClick={handleClick}>Add to cart</AddToCartButton>
      {cart.map((item) => {
        if (item.id === data.id) {
          return (
            <RemoveOneFromQuantityButton onClick={handleRemove} key={data.id}>
              -
            </RemoveOneFromQuantityButton>
          );
        }
      })}
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
