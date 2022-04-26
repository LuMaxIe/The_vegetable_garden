const { 
    getCostForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
} = require('./farm.js');

describe('Calculate the total amount of costs for a crop.', () => {
  const corn = {
      name: "corn",
      cost: 1,
  };
  const input = {
      crop: corn,
      numCrops: 10,
  };
  test('should calculate correct costs', () => {
      expect(getCostForCrop(input)).toBe(10)
  });
});

describe('Calulcate the revenue for a crop', () => {
    const corn = {
        name: "corn",
        salePrice: 3,
    };
    const input = {
        crop: corn,
        numCrops: 10,
    };
    test('should get correct revenue', () => {
        expect(getRevenueForCrop(input)).toBe(30);
    });
});

describe('Calculate profit for a crop', () => {
    const corn = {
        name: "corn",
        salePrice: 3,
        cost: 1
    };
    const input = {
        crop: corn,
        numCrops: 10,
    };
    test('should get correct profit for single crop', () => {
        expect(getProfitForCrop(input)).toBe(20);
    });
});

describe('Calculate profit for multiple crops', () => {
    const corn = {
        name: "corn",
        salePrice: 3,
        cost: 1
    };
    const pumpkin = {
        name: "pumpkin",
        salePrice: 4,
        cost: 2
    };
    const crops = [
        { crop: corn, numCrops: 5 },
        { crop: pumpkin, numCrops: 2 },
    ];
    test('should get correct profit for more than 1 crop', () => {
        expect(getTotalProfit({ crops })).toBe(14)
    });
})