import Link from "next/link";
import styled from "styled-components";
import { Normalize } from "styled-normalize";

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");
  
  background: gray;
  font-family: "Roboto", sans-serif;
`;

const MyApp = ({ Component, pageProps }) => {
  return (
    <Container>
      <Normalize />
      <Link href="/">
        <a>Home</a>
      </Link>
      <Component {...pageProps} />
    </Container>
  );
};

export default MyApp;
