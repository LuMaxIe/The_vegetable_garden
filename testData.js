exports.corn = {
  name: "corn",
  yield: 30,
  salePrice: 3,
  cost: 1,
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

exports.pumpkin = {
  name: "pumpkin",
  yield: 20,
  salePrice: 4,
  cost: 2,
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
  }
}