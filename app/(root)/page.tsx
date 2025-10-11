// export const metadata = {
//   title: "Home",
// **beside favicon**}

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
// const Homepage = async () => {
//   await delay(2000);
//   return ( <>Prostore</> );
// **test for loader dealay 2sec**}

import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";

const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  // console.log("latestProducts:", latestProducts);

  return (
    <>
      <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
    </>
  );
};

export default Homepage;
