import React from "react";
import { BasisProvider, defaultTheme } from "basis";
import Button from "../../components/kitchen-sink/Button";
import Checkbox from "../../components/kitchen-sink/Checkbox";
import Footer from "../../components/kitchen-sink/Footer";
import Header from "../../components/kitchen-sink/Header";
import Input from "../../components/kitchen-sink/Input";
import Link from "../../components/kitchen-sink/Link";
import Text from "../../components/kitchen-sink/Text";
import "typeface-montserrat";
import "typeface-roboto";

function KitchenSink() {
  return (
    <BasisProvider theme={defaultTheme}>
      <Button />
      <Checkbox />
      <Footer />
      <Header />
      <Input />
      <Link />
      <Text />
    </BasisProvider>
  );
}

export default KitchenSink;
