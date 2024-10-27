import React, { useState } from 'react';
import "./Category.css";
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import ItemDisplay from '../../components/ItemDisplay/ItemDisplay';

function Home() {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <ExploreMenu category={category} setCategory={setCategory} />
      <ItemDisplay category={category} />
    </div>
  );
}

export default Home;
