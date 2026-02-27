import type { NextPage } from 'next';
import Head from 'next/head';
import BuilderLayout from '@/modules/builder/BuilderLayout';

const BuilderPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>E-Resume: Builder</title>
        <meta name="description" content="Single Page Resume Builder" />
        <link
          rel="icon"
          type="image/png"
          href="https://cdn-icons-png.flaticon.com/128/3135/3135800.png"
        />
      </Head>

      <BuilderLayout />
    </div>
  );
};

export default BuilderPage;
