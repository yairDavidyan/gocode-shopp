import './productFilter.css';

function ProductFilter({ categories ,changeDisplay}) {

  return (
    <nav className="ProductFilter">
    <h1>Jackets</h1>

    <div className="sort">
      <div className="collection-sort">
        <label>Filter by:</label>
          <select onChange={(e)=>changeDisplay(e.target.value)}>
           <option value="all products">All</option>
          <option value="men clothing">{categories[0]}</option>
          <option value="jewelery">{categories[1]}</option>
          <option value="electronics">{categories[2]}</option>
          <option value="women clothing">{categories[3]}</option>
        </select>
      </div>

      <div className="collection-sort">
        <label>Sort by:</label>
        <select>
          <option value="/">Featured</option>
          <option value="/">Best Selling</option>
          <option value="/">Alphabetically, A-Z</option>
          <option value="/">Alphabetically, Z-A</option>
          <option value="/">Price, low to high</option>
          <option value="/">Price, high to low</option>
          <option value="/">Date, new to old</option>
          <option value="/">Date, old to new</option>
        </select>
      </div>
    </div>
  </nav>
 
  );
}

export default ProductFilter;