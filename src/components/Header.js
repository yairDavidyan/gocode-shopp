import './header.css';
import Slider from '@material-ui/core/Slider';

import { useContext} from 'react';
import CartContext from "./CartContext";
import ImageHeader from './ImageHeader';
import { makeStyles } from '@material-ui/core/styles';


function Header({ categories ,changeDisplay}) {
  const { setValue, value ,products} = useContext(CartContext);
  
  
  const handleChange = (even,newValue) => { 
    setValue(newValue);
  };
  const useStyles = makeStyles({
    root: {
      width: '30%',
      margin: '40px 65px'
    },
  });
  const classes = useStyles();


  return (
    <>
          {/* <ImageHeader/> */}
    <nav className="ProductFilter">
      <h1 className="HeaderH1">on line <br /> shopping</h1>
        <Slider
        className={classes.root}
        value={value}
        max={1000}
        onChange={handleChange}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
      />
      <div className="sort">
    
      <div className="collection-sort">
        <label className="lableApp">Filter by:</label>
            <select onChange={(e) => changeDisplay(e.target.value)}>
           <option value="all products">All</option>
            {categories.map(categories => <option value={categories} key={categories}>{categories}</option>)}
        </select>
        </div>
        
      <div className="collection-sort">
        <label className="lableApp">Sort by:</label>
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
      </>
 
  );
}

export default Header;