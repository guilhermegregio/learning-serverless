import React from 'react'
import { Button, Glyphicon } from 'react-bootstrap'
import styled, { keyframes } from 'styled-components'

const rotate360 = keyframes`
  from { transform: scale(1) rotate(0deg); }
  to { transform: scale(1) rotate(360deg); }
`;

const GlyphiconSpinning = styled(Glyphicon) `
  margin-right: 7px;
  top: 2px;
  animation: ${rotate360} 1s infinite linear;
`

const LoaderButton = ({ isLoading, text, loadingText, className = '', disabled = false, ...props }) => (
  <Button
    className={`LoaderButton ${className}`}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading && <GlyphiconSpinning glyph="refresh" className="spinning" />}
    {!isLoading ? text : loadingText}
  </Button>
)

export default LoaderButton
