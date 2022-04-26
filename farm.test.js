const { 
    getCostForCrop 
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
