const fs = require("fs");
const matter = require("gray-matter");

const getProducts = () => {
  const directory = `${process.cwd()}/content`;
  const filenames = fs.readdirSync(directory);

  const products = filenames.map((filename) => {
    const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();
    const { data } = matter(fileContent);

    return data;
  });

  return products;
};

exports.handler = async (event, context) => {
  const { cart } = JSON.parse(event.body);

  process.env.STRIPE_PUBLIC_KEY

  const products = getProducts();

  const cartWithProducts = cart.map(({ id, quantity }) => {
    const product = products.find((p) => p.id === id);
    return {
      ...product,
      quantity,
    };
  });

  console.log(cartWithProducts);
  return {
    statusCode: 200,
    body: "I have charged that card many times!",
  };
};
