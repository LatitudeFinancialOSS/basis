import React from "react";
import { Container, Grid, Text } from "basis";
import Layout from "./Layout";

function KitchenSinkGrid() {
  return (
    <Layout name="Grid">
      <Container padding="4">
        <Grid preset="page">
          <Grid.Item colSpan="0" colSpan-sm="0-1" colSpan-lg="0-2">
            <Text weight="bold">
              {`Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.`}
            </Text>
          </Grid.Item>
          <Grid.Item colSpan="2-3" colSpan-sm="4-7" colSpan-lg="6-11">
            <Text>
              {`There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text. All the Lorem Ipsum generators on
              the Internet tend to repeat predefined chunks as necessary, making
              this the first true generator on the Internet. It uses a
              dictionary of over 200 Latin words, combined with a handful of
              model sentence structures, to generate Lorem Ipsum which looks
              reasonable. The generated Lorem Ipsum is therefore always free
              from repetition, injected humour, or non-characteristic words etc.`}
            </Text>
          </Grid.Item>
          <Grid.Item colSpan="all">
            <Text intent="legal" margin="6 0 0 0">
              {`It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).`}
            </Text>
          </Grid.Item>
        </Grid>
      </Container>
    </Layout>
  );
}

export default KitchenSinkGrid;
