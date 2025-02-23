const asyncHandler = (func) => {
  return (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

// using try - catch
/*
const asyncHandler = (func) => async (req , res , next) => {
    try {
        await func(req , res , next)
    } catch (error) {
        res.status(err.code || 500).json({
              success: false,
              message: err.message,
        });
    }
}
*/
