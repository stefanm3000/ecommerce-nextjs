import styled from "styled-components";
import { Normalize } from "styled-normalize";
import Navbar from "../components/Navbar";

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");

  background: gray;
  font-family: "Roboto", sans-serif;

  background: linear-gradient(to right, #757f9a, #d7dde8);
  color: #444
`;

const Page = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
`;

const MyApp = ({ Component, pageProps }) => {
  return (
    <Container>
      <Normalize />
      <Navbar />
      <Page>
        <Component {...pageProps} />
      </Page>
    </Container>
  );
};

export default MyApp;
