/**
*
* MinimalButton
*
*/

import React from 'react';
import styled from 'styled-components';

const MinimalButton = styled.input`
  padding: 10px 20px;
  background: white;
  border-radius: 4px;
  border: 1px solid #eee;
  margin-top: 10px;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  
  &:hover {
     box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
     cursor: pointer;
  }
`;

export default MinimalButton;
