const { 
    getCostForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
    getYieldForCrop,
    getTotalYield
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

describe('get yield for crop including evironmental factors', () => {
    const corn = {
        name: "corn",
        yield: 30,
        factor: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            wind: {
                low: 50,
                medium: 0,
                high: -50,
            },
        },
    };
        
    const environmentFactors = {
        sun: "low",
        wind: "medium",
    };

    const environmentFactors2 = {
        sun: "high",
        wind: "high",
    }

    const input = {
        crop: corn,
        numCrops: 10,
        environmentFactors
    }

    const input2 = {
        crop: corn,
        numCrops: 10,
        environmentFactors: environmentFactors2
    }

    test('should get correct yield for crop with first factor set', () => {
        // 300 - 50% = 150, 0 is excluded from calculation
        expect(getYieldForCrop(input)).toBe(150)
    });

    test('should get correct yield for crop with second factor set', () => {
        // 300 + 50% - 50% = 225
        expect(getYieldForCrop(input2)).toBe(225)
    });
})

describe('Get correct yield for multiple crops, environmental factors included', () => {
    const corn = {
        name: "corn",
        yield: 30,
        factor: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            wind: {
                low: 50,
                medium: 0,
                high: -50,
            },
        },
    };

    const pumpkin = {
        name: "pumpkin",
        yield: 20,
        factor: {
            sun: {
                low: -40,
                medium: 0,
                high: 40,
            },
            wind: {
                low: 30,
                medium: 0,
                high: -30,
            },
        },
    };

    const environmentFactors = {
        sun: "low",
        wind: "medium",
    };

    const crops = [
        { crop: corn, numCrops: 5, environmentFactors},
        { crop: pumpkin, numCrops: 4, environmentFactors}
    ]
    test('should calculate correct total yield including environment factors', () => {
        // Corn: (30 * 5) - 50% = 75
        // Pumpkin: (20 * 4) - 40% = 48
        // wind is excluded
        expect(getTotalYield({ crops })).toBe(123)
    });
    
})