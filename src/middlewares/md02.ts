export const middleware02 = (param) => {
  return async (ctx, next) => {
    console.log(param);
    await next();
  };
};
