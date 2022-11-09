interface TypedRequest<T, U> extends Express.Request {
  body: U;
  query: T;
}

export default TypedRequest;
