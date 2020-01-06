import React from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode } from "../../../utils/formatting";

const scope = allDesignSystem;

function FooterPage() {
  const code = formatCode(`
    <Footer>
      <Footer.Header>
        <Footer.Header.Logo />
      </Footer.Header>
      <Footer.Legal>
        <Footer.Legal.Links>
          <Link href="#" newTab>Link 1</Link>
          <Link href="#" newTab>Link 2</Link>
          <Link href="#" newTab>Link 3</Link>
        </Footer.Legal.Links>
        <Footer.Legal.Copy>
          Legal copy goes here.
        </Footer.Legal.Copy>
      </Footer.Legal>
    </Footer>
  `);

  return (
    <ComponentContainer
      code={code}
      scope={scope}
      width="md"
      hasBodyMargin={false}
    />
  );
}

export default FooterPage;
