import React from "react";
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  padding-top: 100px;
  text-align: center;
`

const NotFound = () => (
  <NotFoundContainer className="NotFound">
    <h3>Sorry, page not found!</h3>
  </NotFoundContainer>
);

export default NotFound;
