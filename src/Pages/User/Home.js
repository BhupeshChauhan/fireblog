import React, { useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router";
import CarouselComponent from "../../Components/CarouselComponent";
import VerticalCard from "../../Components/VerticalCard";
import { useFirebase } from "../../Context/FirebaseContext";
import { useUserAuth } from "../../Context/UserAuthContext";

const Home = () => {
  const { BlogData, CategoryData } = useFirebase();
  const [Category, setCategory] = useState("all")
  return (
    <>
      <CarouselComponent>
      {BlogData.map((item, id) => {
        const DateTime = item.DateTime.toDate();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        if(item.Featured === true && id < 5) {
          return (
            <Carousel.Item interval={1000} key={item.id}>
              <div className="overlay"></div>
            <img
              className="d-block w-100"
              src={item.FeatureImage.fileUrl}
              alt={item.FeatureImage.fileName}
              height="550px"
              width="100%"
              />
          <Carousel.Caption>
            <div style={{display: "flex"}}>
                <p className="cardAuthor">by {item.Author}</p>
                <p className="cardDate">{months[DateTime.getMonth()]} {DateTime.getDate()}, {DateTime.getFullYear()}</p>
            </div>
            <h3 className='cardH3'>{item.BlogTitle}</h3>
            <p className='cardP' style={{width: "70%"}}>{item.BlogDescription}</p>
            <a href={`/Blog/${item.uid}`}>
            <Button variant="warning">READ MORE</Button>
            </a>
          </Carousel.Caption>
          </Carousel.Item>
        )}
      }
      )}
      </CarouselComponent>
      <div style={{margin: "40px", padding: "0px 20px"}}>
        <div className="container" style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row"}}> 
          <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
            <Button variant={Category === "all" ? "dark" : "outline-dark"} style={{marginRight: "20px"}} onClick={() => setCategory("all")}>All Categories</Button>
            {CategoryData.map((item, id) => {
              const {CategoryTitle} = item
              return (
                <div key={id}>
                  <Button 
                    variant={Category !== CategoryTitle ? "outline-dark" : "dark"} 
                    style={{marginRight: "20px"}} 
                    onClick={() => setCategory(CategoryTitle)}
                    >
                    {CategoryTitle}
                    </Button>
                </div>
              )
            }) }
          </div>
        </div>
      </div>
      <div>
      {BlogData.map((item, id) => {
        const {Categories} = item
        if(Category === "all"){
          return (
          <div key={id}>
              <VerticalCard item={item} id={id} />
          </div>
        )} 
        if(Category !== "all"){
          console.log(Category)
          console.log(Categories.indexOf(Category) > -1)
          return (
          <div key={id}>
              {Categories.indexOf(Category) > -1 ? <VerticalCard item={item} id={id} /> : null}
          </div>
        )}
      })}
      </div>
    </>
  );
};

export default Home;