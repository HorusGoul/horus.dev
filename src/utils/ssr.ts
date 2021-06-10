import { GetServerSideProps, GetServerSidePropsResult, Redirect } from 'next';
import { ParsedUrlQuery } from 'querystring';

class ServerSideResult<
  Props extends Record<string, unknown> = Record<string, unknown>,
> {
  result: GetServerSidePropsResult<Props>;

  constructor(result: GetServerSidePropsResult<Props>) {
    this.result = result;
  }
}

export class NotFoundResult extends ServerSideResult {
  constructor() {
    super({ notFound: true });
  }
}

export class RedirectResult extends ServerSideResult {
  constructor(redirect: Redirect) {
    super({ redirect });
  }
}

export function createGetServerSideProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  F extends GetServerSideProps<P, Q> = GetServerSideProps<P, Q>,
>(func: F): F {
  return (async (context) => {
    try {
      const result = await func(context);

      return result;
    } catch (e) {
      if (e instanceof ServerSideResult) {
        return e.result;
      }

      throw e;
    }
  }) as F;
}
