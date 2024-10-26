import React, { useState } from 'react';
import "./Home.css";
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import ItemDisplay from '../../components/ItemDisplay/ItemDisplay';
import MobileSection from '../../components/MobileSection/MobileSection'; // Import MobileSection

function Home() {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <ItemDisplay category={category} />
      <MobileSection /> 
    </div>
  );
}

export default Home;
