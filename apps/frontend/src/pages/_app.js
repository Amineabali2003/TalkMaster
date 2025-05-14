import Layout from "@/components/layout/Layout";
import "@/styles/globals.css"; // si tu as des styles globaux

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
