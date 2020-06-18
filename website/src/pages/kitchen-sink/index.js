import React from "react";
import { BasisProvider, defaultTheme } from "basis";
import {
  Accordion,
  Button,
  Checkbox,
  Container,
  DatePicker,
  Divider,
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
  Select,
  ShadowContainer,
  Stack,
  Stepper,
  Sticky,
  Text,
  TimeSpan,
} from "../../components/kitchen-sink";
import "typeface-montserrat";
import "typeface-roboto";

function KitchenSink() {
  return (
    <BasisProvider theme={defaultTheme}>
      <Accordion />
      <Button />
      <Checkbox />
      <Container />
      <DatePicker />
      <Divider />
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
      <Select />
      <ShadowContainer />
      <Stack />
      <Stepper />
      <Sticky />
      <Text />
      <TimeSpan />
    </BasisProvider>
  );
}

export default KitchenSink;
