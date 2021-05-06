import './imageHeader.css';
function ImageHeader() {
    return (
        
        <div>
            <section class='galeria'>
                <input type="radio" id="uno" value="1" name="tractor" checked='checked' />
                <input type="radio" id="dole" value="2" name="tractor" />
                <inu type="radio" id="tele" value="3" name="tractor" />
                <article class='card una'>
                    <h2 class='entypo-tag'>Three Labels</h2>
                    <p>Three Labels for each Input.<br />
                        One for go back,<br />
                        Another for go ahead,<br />
                        The Last for recover it.</p>
                        <label for='dole' class='entypo-left-bold otra'></label>
    <label for='tele' class='entypo-right-bold otra'></label>
    <label for='uno' class='entypo-arrows-ccw afin'></label>  
                    
                </article>
  
                <article class='card dos'>
                    <h2 class='entypo-feather'>One Input to rule them all</h2>
                    <p>In the Land of the Good Taste<br />
                        where the Performers dwell.<br />
                        One Input to rule them all,<br />
                        One Input to find them.</p>
                        <label for='dole' class='entypo-left-bold otra'></label>
    <label for='tele' class='entypo-right-bold otra'></label>
    <label for='uno' class='entypo-arrows-ccw afin'></label>  
                </article>
  
                <article class='card tres'>
                    <h2 class='entypo-address'>In the Land of Styles</h2>
                    <p>One Input to bring them all<br />
                        and in the Html bind them<br />
                        In the Land of Styles<br />
                        where the Css is the King.</p>
                        <label for='dole' class='entypo-left-bold otra'></label>
    <label for='tele' class='entypo-right-bold otra'></label>
    <label for='uno' class='entypo-arrows-ccw afin'></label>  
                </article>
            </section>
        </div>
    );
}

export default ImageHeader;