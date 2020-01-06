# Basis Design System

## Installation

```shell
npm install --save basis @emotion/core
```

Install the fonts that your theme needs. For example, if you are using the default theme:

```shell
npm install --save typeface-{montserrat,roboto}
```

## Usage

```jsx
import React from "react";
import { ThemeProvider, defaultTheme, Text } from "basis";
import "typeface-montserrat";
import "typeface-roboto";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Text>Hello World</Text>
    </ThemeProvider>
  );
}

export default App;
```

## Developing locally

```shell
1. npm install
2. cd website
3. npm install
4. npm start
```
