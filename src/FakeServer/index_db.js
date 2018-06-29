const faker = require('faker');
const fs = require('fs');
const path = require('path');

// const products = (number = 1000) => {
const number = 1000;
const data = {
  siteProducts: [],
  dbProducts: [],
};
// Create 1000 products
faker.locale = 'ru';

for (let i = 0; i < number; i += 1) {
  data.siteProducts.push({
    id: i,
    name: faker.commerce.product(),
    fullName: faker.commerce.productName(),
    price: faker.commerce.price(),
  });
}
for (let i = 0; i < number; i += 1) {
  data.dbProducts.push({
    id: i,
    name: faker.commerce.product(),
    fullName: faker.commerce.productName(),
    price: faker.commerce.price(),
  });
}

fs.writeFile('products.json', JSON.stringify(data, null, '  '), function cb(err) {
  if (err) {
    return console.log(err);
  }
  console.log('The file was saved!');
});
// return data;
// };

// export default products;
