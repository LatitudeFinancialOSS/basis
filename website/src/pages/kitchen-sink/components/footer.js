import React from "react";
import { Container, Footer, Link, Text } from "basis";
import KitchenSinkLayout from "../../../components/kitchen-sink/KitchenSinkLayout";

function KitchenSinkFooter() {
  return (
    <KitchenSinkLayout name="Footer">
      <Container padding="6 0">
        <Footer>
          <Footer.Header>
            <Footer.Header.Logo name="latitude" />
            <Footer.Header.Social>
              <Footer.Header.Social.Facebook
                href="https://www.facebook.com/latitudefinancialservices/"
                title="Latitude Financial Facebook"
              />
              <Footer.Header.Social.YouTube
                href="https://www.youtube.com/channel/UC4OODvUJswoDRTS_xFCCXcw/"
                title="Latitude Financial YouTube"
              />
              <Footer.Header.Social.Twitter
                href="https://twitter.com/Latitude_FS/"
                title="Latitude Financial Twitter"
              />
              <Footer.Header.Social.Instagram
                href="https://www.instagram.com/Latitude_FS/"
                title="Latitude Financial Instagram"
              />
              <Footer.Header.Social.LinkedIn
                href="https://www.linkedin.com/company/latitude-financial-services/"
                title="Latitude Financial LinkedIn"
              />
            </Footer.Header.Social>
          </Footer.Header>
          <Footer.Legal>
            <Footer.Legal.Links>
              <Link
                href="https://www.latitudefinancial.com.au/terms-and-conditions/"
                newTab
              >
                Terms and conditions
              </Link>
              <Link href="https://www.latitudefinancial.com.au/privacy/" newTab>
                Privacy and credit reporting policy
              </Link>
              <Link
                href="https://www.latitudefinancial.com.au/security/"
                newTab
              >
                Security
              </Link>
              <Link
                href="https://www.latitudefinancial.com.au/complaints/"
                newTab
              >
                Complaints
              </Link>
              <Link
                href="https://www.latitudefinancial.com.au/hardship/"
                newTab
              >
                Financial hardship
              </Link>
              <Link href="https://www.latitudefinancial.com.au/sitemap/" newTab>
                Site map
              </Link>
            </Footer.Legal.Links>
            <Footer.Legal.Copy>
              <Text>
                {"The Latitude Group recommends that you read the "}
                <Link
                  href="https://www.latitudefinancial.com.au/terms-and-conditions/"
                  newTab
                >
                  Terms and conditions
                </Link>
                {" and "}
                <Link
                  href="https://www.latitudefinancial.com.au/privacy/"
                  newTab
                >
                  Privacy and Credit Reporting Policy
                </Link>{" "}
                of the website. The Latitude Group is a leader in consumer
                finance in Australia and New Zealand offering a range of
                services: including personal loans, car loans, credit cards,
                personal insurance, interest free and promotional retail. In
                Australia, the Latitude Group includes: Latitude Financial
                Services Australia Holdings Pty Ltd (ABN 46 603 161 100);
                Latitude Finance Australia (ABN 42 008 583 588 Australian Credit
                Licence Number 392145); Latitude Personal Finance Pty Ltd (ABN
                54 008 443 810 Australian Credit Licence Number 392163) and
                Latitude Automotive Financial Services (ABN 80 004 187 419
                Australian Credit Licence Number 392178) trading as Latitude
                Financial Services. LatitudePay Payment Plan provided by
                LatitudePay Australia Pty Ltd ABN 23 633 528 873. In New
                Zealand, the Latitude Group includes: Latitude Financial
                Services Limited (Company number 5624865). Latitude Financial
                Services 800 Collins Street, Docklands, Victoria 3008.
              </Text>
            </Footer.Legal.Copy>
          </Footer.Legal>
        </Footer>
      </Container>
    </KitchenSinkLayout>
  );
}

export default KitchenSinkFooter;
