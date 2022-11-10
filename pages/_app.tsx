import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";
import { Head } from "next/document";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <title>📃 K-List</title>
      <Component {...pageProps} />;
    </UserProvider>
  );
}
