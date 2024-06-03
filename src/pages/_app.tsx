import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { Roboto } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from "next/router";
import { useEffect } from "react";

const roboto = Roboto({
  weight: ["300", "400", "500"],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

interface RouteChangeError extends Error {
  cancelled: boolean;
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeError = (err: RouteChangeError, url: string) => {
      if (typeof err === "object" && err !== null && "cancelled" in err) {
        const errorWithCancelled = err as { cancelled: boolean };
        if (errorWithCancelled.cancelled) {
          console.warn(`Route to ${url} was cancelled! This might be due to a redirection or user navigating away quickly.`);
        } else {
          console.error(`Error occurred while changing to ${url}`, err);
        }
      } else {
        console.error(`Unexpected error occurred while changing to ${url}`, err);
      }
    };

    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router]);

  return (
    <SessionProvider session={pageProps.session}>
      <div className={roboto.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </SessionProvider>
  );
}

export default MyApp;
