import { injectGlobal } from 'styled-components'

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    color: #333;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: "PT Serif", serif;
  }

  select.form-control,
    textarea.form-control,
    input.form-control {
    font-size: 16px;
  }
  input[type=file] {
    width: 100%;
  }
`