// create own error to prevent monkey patching
class SenecaBaseError extends Error {
  // ref: https://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify
  toJSON() {
    const alt = {};

    Object.getOwnPropertyNames(this).forEach((key) => {
      alt[key] = this[key];
    }, this);

    return alt;
  }
}

module.exports = {
  SenecaBaseError,
};
