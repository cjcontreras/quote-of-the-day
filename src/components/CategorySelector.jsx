const CategorySelector = ({ categories, selected, onSelect }) => {
  return (
    <div style={{ margin: '1rem' }}>
      {categories.map(cat => (
        <button
          key={cat}
          style={{
            margin: '0.25rem',
            backgroundColor: selected === cat ? '#b17d52' : 'white',
            color: selected === cat ? 'white' : 'black'
          }}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;