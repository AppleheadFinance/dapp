//  to import from next
import type { NextPage } from "next";
import Head from "next/head";
//  to import
import IcoSale from './ico-sale';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>AppleHead</title>
        <meta
          name="description"
          content="Applehead Swap"
        />
        <meta httpEquiv="Cache-control" content="max-age=31536000" />
      </Head>
      <div className="max-w-[1440px] m-auto px-20 tablet:px-8">
        <IcoSale />
      </div>
    </>
  );
};

export default Home;
