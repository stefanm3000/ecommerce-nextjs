import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";

const HomePage = (props) => {
  return props.products.map((product) => {
    return (
      <div>
        <Link href={product.slug}>
          <a>
            <h1>{product.name}</h1>
          </a>
        </Link>
        <p>{product.description}</p>
        <p>{product.price / 100} eur</p>
      </div>
    );
  });
};

export const getStaticProps = async () => {
  const directory = `${process.cwd()}/content`;
  const filenames = fs.readdirSync(directory);

  const products = filenames.map((filename) => {
    //first read the file from filesystem
    const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();

    //then get out frontmatter
    const { data } = matter(fileContent);

    //then return the name, slug
    const slug = `/products/${filename.replace(".md", "")}`;
    const product = {
      ...data,
      slug: slug,
    };

    return product;
  });
  return {
    props: {
      products: products,
    },
  };
};

export default HomePage;
