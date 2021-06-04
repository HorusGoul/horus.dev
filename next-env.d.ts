/// <reference types="next" />
/// <reference types="next/types/global" />

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
