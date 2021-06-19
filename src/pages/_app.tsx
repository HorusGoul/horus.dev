import { AppProps } from 'next/app';
import '../styles/index.scss';
import Head from 'next/head';
import NextNprogress from 'nextjs-progressbar';
import { theme } from '@/../tailwind.config';

function MyApp({ Component, pageProps, router }: AppProps) {
  const includePlausible = !router.pathname.includes('/__');

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=1.0"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/icon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/icon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/icon/favicon-16x16.png"
        />
        <link rel="manifest" href="/images/icon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/images/icon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed for horus.dev"
          href="/rss"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="Atom Feed for horus.dev"
          href="/atom"
        />
        <link
          rel="alternate"
          type="application/json"
          title="JSON Feed for horus.dev"
          href="/json"
        />
        {/* Plausible Analytics */}
        {includePlausible && (
          <script
            async
            defer
            data-domain="horus.dev"
            data-api="/api/event"
            src="/js/script.js"
          ></script>
        )}
        <script>{`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}</script>
      </Head>

      <NextNprogress
        color={theme.colors.purple[500]}
        startPosition={0.3}
        stopDelayMs={200}
        height={4}
      />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
