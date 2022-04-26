exports.getYieldForPlant = (input) => {
  return input.yield
};

exports.getYieldForCrop = (input) => {
  return input.numCrops * input.crop.yield;
}

exports.getTotalYield = (input) => {
  return input.crops.reduce((a, b) => a + (b.crop.yield * b.numCrops), 0);
}

exports.getCostForCrop = (input) => {
  return input.numCrops * input.crop.cost;
}

