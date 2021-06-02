import Error from 'next/error';
import { useEffect } from 'react';

declare global {
  interface PlausibleEvents {
    ['404']: { path: string };
  }
}

export default function Page() {
  useEffect(() => {
    plausible('404', { props: { path: document.location.pathname } });
  }, []);

  return <Error statusCode={404} />;
}
