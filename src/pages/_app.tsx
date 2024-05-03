import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from  "@/components/Layout";
import { Roboto } from 'next/font/google';

const roboto = Roboto( {
  weight: ["300", "400", "500"],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={roboto.className}>
      <Layout >
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default MyApp;
