import React from "react";
import * as allDesignSystem from "basis";
import ComponentContainer from "../../../components/ComponentContainer";
import { formatCode } from "../../../utils/formatting";

const scope = allDesignSystem;

function FooterPage() {
  const code = formatCode(`
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
      <Footer.Links>
        <Footer.Links.Section title="Latitude">
          <Link href="https://www.latitudefinancial.com.au/about-us/" newTab={false}>About us</Link>
          <Link href="https://www.latitudefinancial.com.au/contact-us/" newTab={false}>Contact us</Link>
          <Link href="https://www.latitudefinancial.com.au/careers/" newTab={false}>Careers</Link>
          <Link href="https://www.latitudefinancial.com.au/investor-relations/" newTab={false}>Investor relations</Link>
        </Footer.Links.Section>
        <Footer.Links.Section title="Our offering">
          <Link href="https://www.latitudefinancial.com.au/loans/" newTab={false}>Personal loans</Link>
          <Link href="https://www.latitudefinancial.com.au/credit-cards/" newTab={false}>Credit cards</Link>
          <Link href="https://www.latitudefinancial.com.au/insurance/" newTab={false}>Insurance</Link>
          <Link href="https://www.latitudefinancial.com.au/brokers/" newTab={false}>Brokers</Link>
        </Footer.Links.Section>
        <Footer.Links.Section title="Loan types">
          <Link href="https://www.latitudefinancial.com.au/loans/personal-loan/" newTab={false}>Personal loan</Link>
          <Link href="https://www.latitudefinancial.com.au/loans/new-and-used-car-loan/" newTab={false}>New and used car loan</Link>
          <Link href="https://www.latitudefinancial.com.au/loans/debt-consolidation-loans/" newTab={false}>Debt consolidation loans</Link>
          <Link href="https://www.latitudefinancial.com.au/loans/home-renovation-loans/" newTab={false}>Home renovation loans</Link>
          <Link href="https://www.latitudefinancial.com.au/loans/travel-loans/" newTab={false}>Travel loans</Link>
        </Footer.Links.Section>
        <Footer.Links.Section title="Discover">
          <Link href="https://www.latitudefinancial.com.au/loans/calculators-and-tools/" newTab={false}>Calculators and tools</Link>
          <Link href="https://www.latitudefinancial.com.au/life-done-better/" newTab={false}>Life done better</Link>
          <Link href="https://www.latitudefinancial.com.au/forms/" newTab={false}>Useful card forms</Link>
          <Link href="https://documents.latitudefinancial.com.au/?_ga=2.26420989.1567887025.1585009056-1237673400.1570406907" newTab={false}>Secure documents</Link>
          <Link href="https://www.latitudefinancial.com.au/mobile-app/" newTab={false}>Latitude app</Link>
          <Link href="https://www.latitudefinancial.com.au/lets/" newTab={false}>Explore Let's</Link>
        </Footer.Links.Section>
      </Footer.Links>
      <Footer.Legal>
        <Footer.Legal.Links>
          <Link
            href="https://www.latitudefinancial.com.au/terms-and-conditions/"
            newTab
          >
            Terms and conditions
          </Link>
          <Link 
            href="https://www.latitudefinancial.com.au/privacy/" 
            newTab
          >
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
          <Link 
            href="https://www.latitudefinancial.com.au/sitemap/" 
            newTab
          >
            Site map
          </Link>
        </Footer.Legal.Links>
        <Footer.Legal.Copy>
          <Text>
            The Latitude Group recommends that you read the 
            <Link href="https://www.latitudefinancial.com.au/terms-and-conditions/" newTab>Terms and conditions</Link> and 
            <Link href="https://www.latitudefinancial.com.au/privacy/" newTab>Privacy and Credit Reporting Policy</Link> of the website. 
            The Latitude Group is a leader in consumer finance in Australia and 
            New Zealand offering a range of services: including personal loans, car loans, 
            credit cards, personal insurance, interest free and promotional retail. In Australia, 
            the Latitude Group includes: Latitude Financial Services Australia Holdings Pty Ltd 
            (ABN 46 603 161 100); Latitude Finance Australia (ABN 42 008 583 588 Australian 
            Credit Licence Number 392145); Latitude Personal Finance Pty Ltd (ABN 54 008 443 810 
            Australian Credit Licence Number 392163) and Latitude Automotive Financial Services 
            (ABN 80 004 187 419 Australian Credit Licence Number 392178) trading as Latitude 
            Financial Services. LatitudePay Payment Plan provided by LatitudePay Australia Pty Ltd 
            ABN 23 633 528 873. In New Zealand, the Latitude Group includes: Latitude Financial 
            Services Limited (Company number 5624865). Latitude Financial Services 800 Collins Street,
            Docklands, Victoria 3008.
          </Text>
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
      bg="grey.t07"
    />
  );
}

export default FooterPage;
