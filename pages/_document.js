import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,900&display=swap"
          rel="stylesheet"
        />

        <link rel="icon" href="/logoicon.svg" type="image/svg" />
        <meta name="description" content="IIT Competition 2023" key="desc" />
      </Head>
      <body className="font-poppins scroll-smooth scrollbar">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
