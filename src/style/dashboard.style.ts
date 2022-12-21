import styled from "@emotion/styled";

export const DashboardStyledModal = styled.div`
  > div {
    padding: 0px 20px 30px 20px;
    margin: 5px 3px;
    border-radius: 5px;
  }
  * {
    margin: 0px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  h1 {
    margin: 5px 0px;
  }
  h5 {
    margin: 5px 0px;
    opacity: 0.7;
  }
  p {
    font-size: 1.4rem;
    opacity: 0.8;
    font-weight: 500;
  }
`;

export const DrawerDashboardStyled = styled.form`
  h1 {
    font-size: 16pt;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-weight: 500;
  }
  padding: 10px;
  width: 350px;
  @media (max-width: 500px) {
    width: 100vw;
  }
`;
