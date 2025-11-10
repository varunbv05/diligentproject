// cache.js -- No-op cache for local development

const cache = {
  route() {
    // Middleware - just passes request through, does not cache (for dev)
    return (req, res, next) => next();
  }
};

export default cache;
