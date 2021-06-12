import {
  GetServerSideProps,
  GetServerSidePropsResult,
  NextApiHandler,
  Redirect,
} from 'next';
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

class ApiResult {}

export function createApiHandler<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends any = any,
  H extends NextApiHandler<T> = NextApiHandler<T>,
>(func: H): H {
  return (async (req, res) => {
    try {
      await func(req, res);
    } catch (e) {
      if (e instanceof Error) {
        const error: Record<string, unknown> = {
          message: e.message,
        };

        return res.status(500).send(error as T);
      }

      if (e instanceof ApiResult) {
        return;
      }
    }
  }) as H;
}

export function endApiHandler() {
  return new ApiResult();
}
