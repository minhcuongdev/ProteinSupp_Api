interface TypedRequest<T, U, P> extends Express.Request {
  body: U;
  query: T;
  params: P;
}

export default TypedRequest;
