import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { HiOutlineMail } from "react-icons/hi";
import { BsWhatsapp } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import "./specificProduct.css";
import ProductCard from "../../components/Product Card/ProductCard";
import { UserContext } from "../../contex/UserContext";
import CircularProgress from "@mui/material/CircularProgress";

function SpecificProduct(props) {
  const { id, tag } = useParams();

  const [details, setDetails] = useState({});

  const [relatedPoducts, setRelatedProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(UserContext);

  async function getDetails() {
    setIsLoading(true);
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/product/${id}`, {
      headers: {
        Authorization: "Bearer" + localStorage.getItem("jwtSwap"),
      },
    });
    setDetails(res.data.data[0]);
    console.log(res.data.data[0]);
    setIsLoading(false);
  }

  async function getRelated() {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/${tag}`, {});
    const realtedArray = res.data.data.filter((item) => {
      return item._id != id;
    });
    setRelatedProducts(realtedArray);
  }

  useEffect(() => {
    getDetails();
  }, [id]);

  useEffect(() => {
    getRelated();
  }, [id]);

  return (
    <>
      <div className="specificFrame">
        {user ? (
          <>
            {!isLoading ? (
              <>
                {" "}
                <div className="imageDiv">
                  <img src={details.productImage} alt="ProductImage" />
                </div>
                <div className="detailsDiv">
                  <div className="priceHeading">
                    <h2>{details.title}</h2>
                    <button>₹{details.price}</button>
                  </div>
                  {details.tag === "book" ? (
                    <h4>
                      Author: <span className="small">{details.author}</span>
                    </h4>
                  ) : (
                    <h4>
                      Brand: <span className="small">{details.brand}</span>
                    </h4>
                  )}
                  <h4>
                    Condition:{" "}
                    <span className="small"> {details.condition}⭐</span>
                  </h4>
                  <p>{details.description}</p>
                  <div className="contactSeller">
                    <h4>
                      Contact Seller :{" "}
                      <span className="small">{details?.listedBy?.email}</span>{" "}
                    </h4>
                    {/* 
                <a
                  href={`tel:+91${details?.listedBy?.mobileNo}`}
                  target="_blank"
                >
                  {" "}
                  <FiPhoneCall className="box" />
                </a>

                <a href={`mailto:${details?.listedBy?.email}`} target="_blank">
                  <HiOutlineMail className="box" />
                </a>

                <a
                  href={`https://wa.me/+91${details?.listedBy?.mobileNo}/?text=Hello Dada`}
                  target="_blank"
                >
                  <BsWhatsapp className="box" />
                </a> */}
                  </div>
                </div>
              </>
            ) : (
              <CircularProgress
                className="loader"
                size="60px"
                color="success"
              />
            )}
          </>
        ) : (
          <>
            <h1 className="needLoginText">
              You have to Sign In first to see the Details
            </h1>
          </>
        )}
      </div>
      <div className="boxWrapper">
        <div className="boxHeading">
          <h2>Related Products</h2>
        </div>
        <div className="boxAdded">
          {relatedPoducts?.slice(0, 5).map((item) => {
            return <ProductCard item={item} />;
          })}
        </div>
      </div>
    </>
  );
}

export default SpecificProduct;
