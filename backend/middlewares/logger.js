export function logger(req, res, next) {
  console.log(req.method + "request came");
  next();
}
