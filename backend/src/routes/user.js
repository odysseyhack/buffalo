module.exports = [{
    method: '/GET',
    path: '/api/user',
    config: { auth: false, cors: true },
    async handler(req, h) {
      const registerTransaction = await resourceService.registerProduct(req.payload.seed, req.payload.product);
      const giveTransaction = await resourceService.giveProduct(req.payload.seed, registerTransaction.id);
      return giveTransaction.id
    }
  }
]

