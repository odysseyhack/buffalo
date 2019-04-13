const resourceService = require('../services/resourceService');

module.exports = [{
    method: 'GET',
    path: '/api/product/register',
    config: { auth: false, cors: true },
    async handler(req, h) {
      const asset = await resourceService.registerProduct('a', 'b');
      return asset.id
    }
  },
  {
    method: 'GET',
    path: '/api/product/give',
    config: { auth: false, cors: true },
    async handler(req, h) {
      const asset = await resourceService.giveProduct('a', '60a3afa3bc540a06eeabce20015b9ec93f8ba1929c118eba30e848aba94835cd');
      console.log('test  ', asset);
      return asset.id;
    }
  },
    {
        method: 'GET',
        path: '/api/product/take',
        config: { auth: false, cors: true },
        async handler(req, h) {
            const asset = await resourceService.takeProduct('a', '6bb519be56ac0cfb5e876e94879e0e8bd86a66d37c83c830896f981e4cec6092');
            console.log('test  ', asset);
            return asset.id;
        }
    }
  ];
