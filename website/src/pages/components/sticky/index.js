import React from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode } from "../../../utils/formatting";

const scope = allDesignSystem;

function StickyPage() {
  const code = formatCode(`
    function StickyNav() {
      return (
        <Placeholder label="Sticky Navigation" height={String(StickyNav.HEIGHT_MAP.default)} />
      );
    }

    // Custom components must define a unique ID and a HEIGHT_MAP.
    StickyNav.ID = "StickyNav";
    StickyNav.HEIGHT_MAP = {
      default: 60
    };

    function App() {
      return (
        <Sticky>
          <Sticky.Item>
            <Header>
              <Header.Logo name="latitude" />
            </Header>
          </Sticky.Item>
          <Sticky.Item>
            <Stepper>
              <Stepper.Item label="Step 1" />
              <Stepper.Item label="Step 2" />
              <Stepper.Item label="Step 3" />
            </Stepper>
          </Sticky.Item>
          <Container margin="6">
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id interdum velit laoreet id donec ultrices tincidunt. Feugiat sed lectus vestibulum mattis ullamcorper velit. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Auctor eu augue ut lectus arcu bibendum at varius vel. Diam ut venenatis tellus in metus vulputate. Aliquam purus sit amet luctus venenatis lectus magna. Semper eget duis at tellus. Justo donec enim diam vulputate ut pharetra sit amet. Amet est placerat in egestas erat imperdiet. Cras adipiscing enim eu turpis egestas pretium.</Text>
          </Container>
          <Sticky.Item>
            <StickyNav />
          </Sticky.Item>
          <Container margin="6">
            <Text>Enim blandit volutpat maecenas volutpat. Vitae semper quis lectus nulla at. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Ullamcorper a lacus vestibulum sed arcu non odio. Facilisis leo vel fringilla est ullamcorper eget nulla facilisi. Habitasse platea dictumst quisque sagittis purus sit amet. Leo integer malesuada nunc vel risus commodo viverra maecenas accumsan. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Consectetur purus ut faucibus pulvinar elementum. Sed arcu non odio euismod lacinia. Faucibus interdum posuere lorem ipsum dolor sit amet. Eget felis eget nunc lobortis. Urna nunc id cursus metus aliquam eleifend mi in. Quisque egestas diam in arcu cursus. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae. Non nisi est sit amet. Ornare arcu odio ut sem nulla pharetra diam sit amet. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit.</Text>
          </Container>
          <Container margin="6">
            <Text>Diam vulputate ut pharetra sit amet aliquam. Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus. Auctor urna nunc id cursus metus aliquam eleifend. Elementum sagittis vitae et leo. Ac turpis egestas integer eget aliquet. Sollicitudin nibh sit amet commodo nulla facilisi nullam. Magna sit amet purus gravida quis. Est ante in nibh mauris cursus mattis. Ac odio tempor orci dapibus ultrices in iaculis nunc. Aenean vel elit scelerisque mauris.</Text>
          </Container>
          <Container margin="6">
            <Text>Sem et tortor consequat id porta nibh. Mus mauris vitae ultricies leo integer. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet. Commodo viverra maecenas accumsan lacus vel facilisis volutpat est velit. Lorem donec massa sapien faucibus. Enim nec dui nunc mattis enim ut tellus. Blandit cursus risus at ultrices mi. Quis enim lobortis scelerisque fermentum dui faucibus. Eget sit amet tellus cras adipiscing enim eu turpis egestas. Pretium lectus quam id leo in vitae turpis massa.</Text>
          </Container>
          <Container margin="6">
            <Text>Habitant morbi tristique senectus et netus et malesuada fames ac. Quisque id diam vel quam elementum pulvinar etiam non. Lorem ipsum dolor sit amet consectetur adipiscing. Cum sociis natoque penatibus et magnis dis. Nisi quis eleifend quam adipiscing. Faucibus a pellentesque sit amet porttitor eget dolor morbi. At quis risus sed vulputate odio. Ante metus dictum at tempor commodo ullamcorper a. In eu mi bibendum neque egestas congue quisque. Mauris in aliquam sem fringilla. Dui faucibus in ornare quam viverra orci. Netus et malesuada fames ac turpis egestas. Diam sollicitudin tempor id eu nisl nunc.</Text>
          </Container>
        </Sticky>
      );
    }

    render(<App />);
  `);

  return (
    <ComponentContainer
      code={code}
      noInline
      scope={scope}
      width="md"
      hasBodyMargin={false}
    />
  );
}

export default StickyPage;
