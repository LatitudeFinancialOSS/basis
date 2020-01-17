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
import { BasisProvider, defaultTheme, Text } from "basis";
import "typeface-montserrat";
import "typeface-roboto";

function App() {
  return (
    <BasisProvider theme={defaultTheme}>
      <Text>Hello World</Text>
    </BasisProvider>
  );
}

export default App;
```

## Developing locally

```shell
npm install
npm start
```

## Thanks

- [ZEIT](https://zeit.co) for outstanding deployment experience.
- [Sharvil Nanavati](https://twitter.com/snrrrub) for providing the `basis` npm package name.

## License

MIT
