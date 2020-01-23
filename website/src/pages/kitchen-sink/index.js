import React from "react";
import { BasisProvider, defaultTheme } from "basis";
import Button from "../../components/kitchen-sink/Button";
import Footer from "../../components/kitchen-sink/Footer";
import Header from "../../components/kitchen-sink/Header";
import Input from "../../components/kitchen-sink/Input";
import Text from "../../components/kitchen-sink/Text";
import "typeface-montserrat";
import "typeface-roboto";

function KitchenSink() {
  return (
    <BasisProvider theme={defaultTheme}>
      <Button />
      <Footer />
      <Header />
      <Input />
      <Text />
    </BasisProvider>
  );
}

export default KitchenSink;
