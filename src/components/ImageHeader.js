
import './imageHeader.css';


function ImageHeader() {
    var slideIndex = 0;
   

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex - 1].style.display = "block";
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
 
    }
  //  showSlides();
    
    return (
        <>
        <div className="slideshow-container">

        <div className ="mySlides fade">
          <div className="numbertext">1 / 3</div>
                  <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2hvcHBpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" style={{ width:'100%'}} alt=""/>
          <div className="text">Caption Text</div>
        </div>
        
        <div className="mySlides fade">
          <div className="numbertext">2 / 3</div>
          <img src="img_snow_wide.jpg" style={{ width:'100%'}} alt=""/>
          <div className="text">Caption Two</div>
        </div>
        
        <div className="mySlides fade">
          <div className="numbertext">3 / 3</div>
          <img src="img_mountains_wide.jpg" style={{ width:'100%'}} alt=""/>
          <div className="text">Caption Three</div>
        </div>
        
        </div>
        <br/>
        
        <div style={{textAlign:'center'}}>
          <span className="dot"></span> 
          <span className="dot"></span> 
          <span className="dot"></span> 
            </div>
            </>
    );
}
export default ImageHeader;