'use strict';

module.exports = {
  async randomMessage(ctx) {
    return ctx.send({
      message: "Hello! This is a random route.",
      randomNumber: Math.floor(Math.random() * 100),
    });
  },
};
