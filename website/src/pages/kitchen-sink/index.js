import React from "react";
import { BasisProvider, defaultTheme } from "basis";
import Button from "../../components/kitchen-sink/Button";
import Checkbox from "../../components/kitchen-sink/Checkbox";
import Container from "../../components/kitchen-sink/Container";
import DatePicker from "../../components/kitchen-sink/DatePicker";
import Flex from "../../components/kitchen-sink/Flex";
import Footer from "../../components/kitchen-sink/Footer";
import Frequency from "../../components/kitchen-sink/Frequency";
import Grid from "../../components/kitchen-sink/Grid";
import Header from "../../components/kitchen-sink/Header";
import Input from "../../components/kitchen-sink/Input";
import Link from "../../components/kitchen-sink/Link";
import RadioGroup from "../../components/kitchen-sink/RadioGroup";
import Section from "../../components/kitchen-sink/Section";
import Text from "../../components/kitchen-sink/Text";
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
      <RadioGroup />
      <Section />
      <Text />
    </BasisProvider>
  );
}

export default KitchenSink;
