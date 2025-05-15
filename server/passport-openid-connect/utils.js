/* eslint-disable no-console */
export const errorHandler = (res, err) => {
  const status = err?.message?.includes('timeout') ? 408 : 500;

  if (err?.response) {
    res
      .status(err.response.status || status)
      .send(err.response.data || err?.message || 'Unknown err');
  } else {
    res.status(status).send(err?.message || 'Unknown error');
  }
};

export const userAuthenticated = (req, res, next) => {
  if (process.env.DEBUGLOGGING) {
    console.log('req.isAuthenticated() == ', req.isAuthenticated());
  }

  res.set('Cache-Control', 'no-store');
  // eslint-disable-next-line no-unused-expressions
  req.isAuthenticated() ? next() : res.sendStatus(401);
};
