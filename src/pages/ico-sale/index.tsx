import React from "react";
//  to support from next
import Head from "next/head";
//  to import element
import { Container } from "elements";
//  to import views
import { Sale } from "views";

const IcoSale = () => {
  return (
    <div>
      <Head>
        <title>Applehead Swap</title>
        <meta
          name="description"
        />
        <meta httpEquiv="Cache-control" content="max-age=31536000" />
      </Head>
      <Container>
        <Sale />
      </Container>
    </div>
  );
};

export default IcoSale;
