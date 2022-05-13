import React from "react";
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';

const Home = ({products, bannerData}) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/> 
      <div className="products-heading">
        <h2>Les meilleures ventes</h2>
        <p>Haut parleur</p>
      </div>
      <div className="products-container">
        {products?.map((product) => <Product key={product.id} product={product} />)}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]' // Récupère tous les products sur sanity
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]' // Récupère tous les banners sur sanity
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products,bannerData }
  }
}
export default Home;
