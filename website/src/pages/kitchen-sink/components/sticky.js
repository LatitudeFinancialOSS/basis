import React from "react";
import { LiveProvider } from "react-live";
import * as allDesignSystem from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";
import ComponentPreview from "../../../components/ComponentPreview";

const { Container } = allDesignSystem;
const scope = allDesignSystem;

function KitchenSinkSticky() {
  const code = `
    function FirstSticky() {
      return (
        <Placeholder
          label="First Sticky"
          height="24"
          height-xs="80"
          height-md="120"
          height-xl="40"
        />
      );
    }
    
    FirstSticky.ID = "FirstSticky";
    FirstSticky.HEIGHT_MAP = {
      default: 24,
      xs: 80,
      md: 120,
      xl: 40
    };
    
    function SecondSticky() {
      return (
        <Placeholder
          label="Second Sticky"
          height="80"
          height-sm="32"
          height-md="56"
        />
      );
    }
    
    SecondSticky.ID = "SecondSticky";
    SecondSticky.HEIGHT_MAP = {
      default: 80,
      sm: 32,
      md: 56
    };
    
    function ThirdSticky() {
      return <Placeholder label="Third Sticky" height="60" height-lg="80" />;
    }
    
    ThirdSticky.ID = "ThirdSticky";
    ThirdSticky.HEIGHT_MAP = {
      default: 60,
      lg: 80
    };

    function App() {
      return (
        <Sticky>
          <Sticky.Item>
            <FirstSticky />
          </Sticky.Item>
          <Sticky.Item>
            <SecondSticky />
          </Sticky.Item>
          <Container margin="6">
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Id
              interdum velit laoreet id donec ultrices tincidunt. Feugiat sed
              lectus vestibulum mattis ullamcorper velit. Nullam ac tortor vitae
              purus faucibus ornare suspendisse sed. Auctor eu augue ut lectus
              arcu bibendum at varius vel.
            </Text>
          </Container>
          <Sticky.Item>
            <ThirdSticky />
          </Sticky.Item>
          <Container margin="6">
            <Text>
              Enim blandit volutpat maecenas volutpat. Vitae semper quis lectus
              nulla at. Tempor orci dapibus ultrices in iaculis nunc sed augue
              lacus. Ullamcorper a lacus vestibulum sed arcu non odio. Facilisis
              leo vel fringilla est ullamcorper eget nulla facilisi. Habitasse
              platea dictumst quisque sagittis purus sit amet. Leo integer
              malesuada nunc vel risus commodo viverra maecenas accumsan. Commodo
              quis imperdiet massa tincidunt nunc pulvinar sapien. Consectetur
              purus ut faucibus pulvinar elementum. Sed arcu non odio euismod
              lacinia. Faucibus interdum posuere lorem ipsum dolor sit amet. Eget
              felis eget nunc lobortis. Urna nunc id cursus metus aliquam eleifend
              mi in. Quisque egestas diam in arcu cursus. Nulla facilisi nullam
              vehicula ipsum a arcu cursus vitae. Non nisi est sit amet. Ornare
              arcu odio ut sem nulla pharetra diam sit amet. Molestie ac feugiat
              sed lectus vestibulum mattis ullamcorper velit.
            </Text>
          </Container>
          <Container margin="6">
            <Text>
              Diam vulputate ut pharetra sit amet aliquam. Nisi scelerisque eu
              ultrices vitae auctor eu augue ut lectus. Auctor urna nunc id cursus
              metus aliquam eleifend. Elementum sagittis vitae et leo. Ac turpis
              egestas integer eget aliquet. Sollicitudin nibh sit amet commodo
              nulla facilisi nullam. Magna sit amet purus gravida quis. Est ante
              in nibh mauris cursus mattis. Ac odio tempor orci dapibus ultrices
              in iaculis nunc. Aenean vel elit scelerisque mauris.
            </Text>
          </Container>
          <Container margin="6">
            <Text>
              Sem et tortor consequat id porta nibh. Mus mauris vitae ultricies
              leo integer. Pellentesque adipiscing commodo elit at imperdiet dui
              accumsan sit amet. Commodo viverra maecenas accumsan lacus vel
              facilisis volutpat est velit. Lorem donec massa sapien faucibus.
              Enim nec dui nunc mattis enim ut tellus. Blandit cursus risus at
              ultrices mi. Quis enim lobortis scelerisque fermentum dui faucibus.
              Eget sit amet tellus cras adipiscing enim eu turpis egestas. Pretium
              lectus quam id leo in vitae turpis massa.
            </Text>
          </Container>
          <Container margin="6">
            <Text>
              Habitant morbi tristique senectus et netus et malesuada fames ac.
              Quisque id diam vel quam elementum pulvinar etiam non. Lorem ipsum
              dolor sit amet consectetur adipiscing. Cum sociis natoque penatibus
              et magnis dis. Nisi quis eleifend quam adipiscing. Faucibus a
              pellentesque sit amet porttitor eget dolor morbi. At quis risus sed
              vulputate odio. Ante metus dictum at tempor commodo ullamcorper a.
              In eu mi bibendum neque egestas congue quisque. Mauris in aliquam
              sem fringilla. Dui faucibus in ornare quam viverra orci. Netus et
              malesuada fames ac turpis egestas. Diam sollicitudin tempor id eu
              nisl nunc.
            </Text>
          </Container>
        </Sticky>
      );
    }

    render(<App />);
  `;
  return (
    <KitchenSinkLayout name="Sticky">
      <Container bg="grey.t05" padding="6 0">
        <Container width="320" height="600" margin="0 auto" bg="white">
          <LiveProvider code={code} scope={scope} noInline>
            <ComponentPreview hasBodyMargin={false} />
          </LiveProvider>
        </Container>
      </Container>

      <Container bg="grey.t05" padding="6 0">
        <Container width="376" height="600" margin="0 auto" bg="white">
          <LiveProvider code={code} scope={scope} noInline>
            <ComponentPreview hasBodyMargin={false} />
          </LiveProvider>
        </Container>
      </Container>

      <Container bg="grey.t05" padding="6 0">
        <Container width="576" height="600" margin="0 auto" bg="white">
          <LiveProvider code={code} scope={scope} noInline>
            <ComponentPreview hasBodyMargin={false} />
          </LiveProvider>
        </Container>
      </Container>

      <Container bg="grey.t05" padding="6 0">
        <Container width="768" height="600" margin="0 auto" bg="white">
          <LiveProvider code={code} scope={scope} noInline>
            <ComponentPreview hasBodyMargin={false} />
          </LiveProvider>
        </Container>
      </Container>

      <Container bg="grey.t05" padding="6 0">
        <Container width="992" height="600" margin="0 auto" bg="white">
          <LiveProvider code={code} scope={scope} noInline>
            <ComponentPreview hasBodyMargin={false} />
          </LiveProvider>
        </Container>
      </Container>

      <Container bg="grey.t05" padding="6 0">
        <Container width="1200" height="600" margin="0 auto" bg="white">
          <LiveProvider code={code} scope={scope} noInline>
            <ComponentPreview hasBodyMargin={false} />
          </LiveProvider>
        </Container>
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkSticky;
