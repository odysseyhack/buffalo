const resourceService = require('../services/resourceService');

module.exports = [{
    method: 'GET',
    path: '/api/product/register',
    config: { auth: false, cors: true },
    async handler(req, h) {
      const asset = await resourceService.registerProduct('a', 'b')
      return asset.id
    }
  },
  {
    method: 'GET',
    path: '/api/product/give',
    config: { auth: false, cors: true },
    async handler(req, h) {
      await resourceService.giveProduct('a', 'c535b02588dacdf003d442b2854cea0fa2345e4da78601f11a97ca6ded7559b3')
      return 'a'
    }
  }
  ];