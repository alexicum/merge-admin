import faker from 'faker';

const products = (number = 1000) => {
  const data = {
    siteProducts: [],
    dbProducts: [],
  };
  // Create 1000 products
  for (let i = 0; i < number; i += 1) {
    data.siteProducts.push({ id: i, name: faker.commerce.productName() });
  }
  for (let i = 0; i < number; i += 1) {
    data.dbProducts.push({ id: i, name: faker.commerce.productName() });
  }
  return data;
};

export default products;
