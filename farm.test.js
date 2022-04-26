const { corn, pumpkin, cornEnvironmentAdjusted } = require('./testData');
const { 
    getCostForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
    getYieldForCrop,
    getTotalYield
} = require('./farm.js');


describe('Calculate the total amount of costs for a crop.', () => {
  const input = {
      crop: corn,
      numCrops: 10,
  };
  test('should calculate correct costs', () => {
      expect(getCostForCrop(input)).toBe(10)
  });
});

describe('Calulcate the revenue for a crop', () => {
    const input = {
        crop: corn,
        numCrops: 10,
    };
    test('should get correct revenue', () => {
        expect(getRevenueForCrop(input)).toBe(900);
    });
});

describe('Calculate profit for a crop', () => {
    const input = {
        crop: corn,
        numCrops: 10,
    };
    test('should get correct profit for single crop', () => {
        expect(getProfitForCrop(input)).toBe(890);
    });
});

describe('Calculate profit for multiple crops', () => {
    const crops = [
        { crop: corn, numCrops: 5 },
        { crop: pumpkin, numCrops: 2 },
    ];
    test('should get correct profit for more than 1 crop', () => {
        expect(getTotalProfit({ crops })).toBe(601)
    });
})

describe('get yield for crop including evironmental factors', () => {
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
});

describe('Calculate total revenue for a crop, environment factors included', () => {
    const input = {
        crop: cornEnvironmentAdjusted,
        numCrops: 10,
        environmentFactors: {
            sun: 'low',
            wind: 'medium',
        }
    }
    test('should calculate the revenue taking yield corrections in consideration.', () => {
        // Yield = 150 after environment factors
        // numCrops = 10
        // Price = 3
        // 150 * 10 * 3
        expect(getRevenueForCrop(input)).toBe(450)
    });
})

