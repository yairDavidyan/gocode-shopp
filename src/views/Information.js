import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./information.css";
import React from "react";
import Load from "../components/Load";
import { Link } from "react-router-dom";

function Information() {
  const { id } = useParams();
  const [bool, setBool] = useState(true);
  const [detailsProduct, setDetailsProduct] = useState({});

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setDetailsProduct(data))
      .then(setBool(false));
  }, []);
  const StyledRating = withStyles({
    iconFilled: {
      color: "#ff6d75",
    },
    iconHover: {
      color: "#ff3d47",
    },
  })(Rating);
  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon />,
      label: "Very Dissatisfied",
    },
    2: {
      icon: <SentimentDissatisfiedIcon />,
      label: "Dissatisfied",
    },
    3: {
      icon: <SentimentSatisfiedIcon />,
      label: "Neutral",
    },
    4: {
      icon: <SentimentSatisfiedAltIcon />,
      label: "Satisfied",
    },
    5: {
      icon: <SentimentVerySatisfiedIcon />,
      label: "Very Satisfied",
    },
  };

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };

  return (
    <div>
      {bool ? (
        <Load />
      ) : (
        <div class="product-card-information">
          <div class="badge-information">Hot</div>
          <Link to="/">
            {" "}
            <i
              class="fa fa-chevron-circle-left"
              style={{ fontSize: "24px", color: "#fc2222" }}
            ></i>{" "}
          </Link>

          <div class="product-tumb-information">
            <img src={detailsProduct.image} alt={detailsProduct.title} />
          </div>
          <div class="product-details-information">
            <span class="product-catagory-information">
              {detailsProduct.category}
            </span>
            {/* <h4><a href="">Women leather bag</a></h4> */}
            <p>{detailsProduct.description}</p>
            <div class="product-bottom-details-information">
              <div class="productPrice-information">
                <small></small>
                {detailsProduct.price}
              </div>
              <div class="product-links=information">
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography component="legend">
                    Custom icon and color
                  </Typography>
                  <StyledRating
                    name="customized-color"
                    defaultValue={2}
                    getLabelText={(value) =>
                      `${value} Heart${value !== 1 ? "s" : ""}`
                    }
                    precision={0.5}
                    icon={<FavoriteIcon fontSize="inherit" />}
                  />
                </Box>

                {/* <a href=""><i class="fa fa-heart-information"></i></a>
					<a href=""><i class="fa fa-shopping-cart-information"></i></a> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Information;
