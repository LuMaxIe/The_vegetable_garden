
exports.getYieldForPlant = (input) => {
  return input.yield
};

exports.getYieldForCrop = (input) => {

  let cropYield = input.numCrops * input.crop.yield;

  if(input.hasOwnProperty('environmentFactors')) {
    for (const environmentFactor in input.environmentFactors) {
      const factorSeverity = input.environmentFactors[environmentFactor]
      const environmentFactorValue = input.crop.factor[environmentFactor][factorSeverity];
      if(environmentFactorValue !== 0) cropYield *= (1 + (environmentFactorValue / 100));
    }
  }
  return cropYield
}

exports.getTotalYield = (input) => {
  return input.crops.reduce((a, b) => a + (this.getYieldForCrop(b)), 0);
}

exports.getCostForCrop = (input) => {
  return input.numCrops * input.crop.cost;
}

exports.getRevenueForCrop = (input) => {
  return (input.numCrops * input.crop.yield) * input.crop.salePrice;
}

exports.getProfitForCrop = (input) => {
  return (this.getRevenueForCrop(input) - this.getCostForCrop(input))
}

exports.getTotalProfit = (input) => {
  return input.crops.reduce((a, b) => a + this.getProfitForCrop(b), 0);
}