const FilterInput = ({ filter, onFilterChange }) => {
  console.log(filter);
  
  return (
    <div>
      <div className='filter'>
        <input
          type='text'
          value={filter}
          placeholder='Filter coins by name or symbol'
          onChange={(e) => onFilterChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterInput;
