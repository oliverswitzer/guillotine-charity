const products = [
  {
    id: 1,
    name: '4 Year College Tuition',
    price: 200000,
    image: '/images/items/burger.jpg'
  },
  {
    id: 2,
    name: 'Charity Water Donation',
    price: 50,
    image: '/images/items/book.jpg'
  }
];

// We want it to be shown by price in ascending order.
products.sort((a, b) => a.price - b.price);

export default products;
