import React, { useState } from 'react';

function Categories() {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Closed'];
  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li
            key={i}
            onClick={() => setActiveCategory(i)}
            className={activeCategory === i ? 'active' : ''}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
