const resourceService = require('../services/resourceService');

module.exports = [{
    method: 'POST',
    path: '/api/product/give',
    config: { auth: false, cors: true },
    async handler(req, h) {
      const registerTransaction = await resourceService.registerProduct(req.payload.seed, req.payload.product);
      const giveTransaction = await resourceService.giveProduct(req.payload.seed, registerTransaction.id);
      return giveTransaction.id
    }
  },
  {
    method: 'POST',
    path: '/api/product/return',
    config: { auth: false, cors: true },
    async handler(req, h) {
      const asset = await resourceService.giveProduct(req.payload.seed, req.payload.transactionId);
      return asset.id
    }
  },
  {
    method: 'POST',
    path: '/api/product/take',
    config: { auth: false, cors: true },
    async handler(req, h) {
      const asset = await resourceService.takeProduct(req.payload.seed, req.payload.transactionId);
      return asset.id
    }
  },
    {
        method: 'GET',
        path: '/api/products',
        config: { auth: false, cors: true },
        async handler(req, h) {
            const assets = await resourceService.getProductsFromCommons();
            return assets;
        }
    },
  ];
