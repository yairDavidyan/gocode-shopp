import './header.css';
import Slider from '@material-ui/core/Slider';
import { useContext, useState} from 'react';
import CartContext from "./CartContext";
import { makeStyles } from '@material-ui/core/styles';
import { Badge, IconButton, withStyles } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';




function Header({ categories ,changeDisplay}) {
  let {totalFilter, setTotalFilter,products,totalProducts, setValue, value,items,setIsCart ,isCart} = useContext(CartContext);
  const handleChange = (even,newValue) => { 
    setValue(() => newValue);
    let select= document.querySelector('.selectCategory').value;
    totalFilter = products.filter(el => ((el.category === select || select === "all products")
      && (el.price >= newValue[0] && el.price <= newValue[1])));
    setTotalFilter(totalFilter.length);
  };
  const useStyles = makeStyles({
    root: {
      width:  '500px;',
    },
    
  });
  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    
    },
    root: {
      marginRight: '100px'
    }
  }))(Badge);
  const classes = useStyles();


  return (
    <>
          {/* <ImageHeader/> */}
      <nav className="ProductFilter">
       
        <h1 className="HeaderH1">on line <br /> shopping</h1>
        <IconButton onClick={()=>setIsCart(!isCart)} aria-label="cart">
      <StyledBadge badgeContent= {items && items.reduce((total, curr) => total + curr.amount , 0)} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
        <div style={{paddingRight: '100px'}}>
        <span style={{display: 'flex' ,paddingLeft: '250px', paddingBottom:'35px'}}>
          <h2>{totalFilter} / </h2>
          <h2>{totalProducts}</h2>
          </span>
        <Slider
        className={classes.root}
        value={value}
        max={1000}
        onChange={handleChange}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
          />
          </div>
      <div className="sort">
    
      <div className="collection-sort">
            <label className="lableApp">Filter by:</label>
            
            <select className="selectCategory" onChange={(e) => changeDisplay(e.target.value)}>
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