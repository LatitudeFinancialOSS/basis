import React from "react";
import { BasisProvider, defaultTheme } from "basis";
import {
  Button,
  Checkbox,
  Container,
  DatePicker,
  Flex,
  Footer,
  Frequency,
  Grid,
  Header,
  Input,
  Link,
  List,
  Placeholder,
  RadioGroup,
  Section,
  Select,
  Stepper,
  Text,
  TimeSpan
} from "../../components/kitchen-sink";
import "typeface-montserrat";
import "typeface-roboto";

function KitchenSink() {
  return (
    <BasisProvider theme={defaultTheme}>
      <Button />
      <Checkbox />
      <Container />
      <DatePicker />
      <Flex />
      <Footer />
      <Frequency />
      <Grid />
      <Header />
      <Input />
      <Link />
      <List />
      <Placeholder />
      <RadioGroup />
      <Section />
      <Select />
      <Stepper />
      <Text />
      <TimeSpan />
    </BasisProvider>
  );
}

export default KitchenSink;
