const { corn, pumpkin } = require('./testData');
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
        crop: JSON.parse(JSON.stringify(corn)),
        numCrops: 10,
        environmentFactors: {
            sun: 'low',
            wind: 'medium',
        }
    }
    input.crop.yield = getYieldForCrop(input) / input.numCrops // adjustment because getYieldForCrop calculates the total amount (Yield * numCrops) and we need the value for a for single crop 

    test('should calculate the revenue taking yield corrections in consideration.', () => {
        // Yield = 15 after environment factors
        // numCrops = 10
        // Price = 3
        // 15 * 10 * 3
        expect(getRevenueForCrop(input)).toBe(450)
    });
})

describe('Calculate profit for a crop, taking yield corrections in consideration.', () => {
    const input = {
        crop: JSON.parse(JSON.stringify(corn)),
        numCrops: 10,
        environmentFactors: {
            sun: 'low',
            wind: 'medium',
        }
    }
    input.crop.yield = getYieldForCrop(input) / input.numCrops // adjustment because getYieldForCrop calculates the total amount (Yield * numCrops) and we need the value for a for single crop 

    test('should calculate correct profit while taking yield corrections in consideration.', () => {
        // revenue = 450
        // cost = -10
        expect(getProfitForCrop(input)).toBe(440)
    });
})

describe('Calculate total profit for multiple crops, taking yield corrections in consideration', () => {
    const cornInput = {
        crop: JSON.parse(JSON.stringify(corn)),
        numCrops: 10,
        environmentFactors: {
            sun: 'low',
            wind: 'medium',
        }
    }
    cornInput.crop.yield = getYieldForCrop(cornInput) / cornInput.numCrops // adjustment because getYieldForCrop calculates the total amount (Yield * numCrops) and we need the value for a for single crop 

    const pumpkinInput = {
        crop: JSON.parse(JSON.stringify(pumpkin)),
        numCrops: 10,
        environmentFactors: {
            sun: 'low',
            wind: 'medium',
        }
    }
    pumpkinInput.crop.yield = getYieldForCrop(pumpkinInput) / pumpkinInput.numCrops // adjustment because getYieldForCrop calculates the total amount (Yield * numCrops) and we need the value for a for single crop 

    const crops = [
        cornInput,
        pumpkinInput
    ];

    test('should calculate correct total profit for multiple crops, while taking yield corrections in consideration.', () => {
        expect(getTotalProfit({ crops })).toBe(900);
    });
})