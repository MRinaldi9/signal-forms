import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const apiReq = req.clone({ url: `https://jsonplaceholder.typicode.com${req.url}` });
  return next(apiReq);
};
