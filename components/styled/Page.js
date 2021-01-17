import styled from "styled-components";

const Page = styled.div`
  background: white;
  border-radius: 5px;
  padding: 1rem 2rem;
  margin: 1rem 0;
  min-height: 300px;
  position:relative;

  @media (max-width: 768px) {
    margin: 10px 20px;
  }
`;

export default Page;
