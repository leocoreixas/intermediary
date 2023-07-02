// CategoryList.jsx

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools, faChalkboardTeacher, faCar, faUserTie, faPalette, faCalendarAlt, faTshirt, faHammer, faHeartbeat, faHome } from '@fortawesome/free-solid-svg-icons';

const categories = [
  { index: 0, name: 'Assistência técnica' },
  { index: 1, name: 'Aulas' },
  { index: 2, name: 'Autos' },
  { index: 3, name: 'Consultoria' },
  { index: 4, name: 'Design e Tecnologia' },
  { index: 5, name: 'Eventos' },
  { index: 6, name: 'Moda e beleza' },
  { index: 7, name: 'Reformas e reparos' },
  { index: 8, name: 'Saúde' },
  { index: 9, name: 'Serviços Domésticos' },
];

const icons = [
  faTools,
  faChalkboardTeacher,
  faCar,
  faUserTie,
  faPalette,
  faCalendarAlt,
  faTshirt,
  faHammer,
  faHeartbeat,
  faHome,
];

const CategoryItem = ({ category, index, isSelected, handleClick, margin }) => {
  const handleHover = (event) => {
    // Add your hover functionality here
  };

  return (
    <div className={`category-item ${isSelected ? 'selected' : ''}`}
      onMouseOver={handleHover}
      onClick={() => handleClick(index)} 
      style={{
        marginRight: `${margin}px`
      }}>
      <FontAwesomeIcon
        icon={icons[index]}
        size="2x"
        className={`category-icon ${isSelected ? 'selected-icon' : ''}`}
      />
      <span className={`category-name ${isSelected ? 'selected-name' : ''}`}>{category}</span>
    </div>
  );
};

const CategoryList = ({ selectedType, handleCategoryClick }) => {
  const [itemMargin, setItemMargin] = useState(30); // Initial margin value

  useEffect(() => {
    // Update the margin dynamically based on the number of categories
    const numCategories = categories.length;
    const totalMargin = numCategories > 1 ? (numCategories - 1) * 30 : 0; // Calculate the total margin

    const containerWidth = document.querySelector('.category-list').offsetWidth;
    const itemWidth = document.querySelector('.category-item').offsetWidth;
    const availableWidth = containerWidth - itemWidth; // Calculate the available width for categories

    const maxMargin = availableWidth / (numCategories - 1); // Calculate the maximum margin based on available width

    if (totalMargin > availableWidth) {
      setItemMargin(maxMargin);
    } else {
      setItemMargin(30);
    }
  }, []);

  return (
    <div className="category-list">
      {categories.map((category) => (
        <CategoryItem
          key={category?.name}
          category={category.name}
          index={category.index}
          isSelected={selectedType === category.index}
          handleClick={handleCategoryClick}
          margin={itemMargin}
        />
      ))}
    </div>
  );
};

export default CategoryList;

