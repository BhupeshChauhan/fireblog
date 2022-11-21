import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import "./VerticalCard.css"

const CategoryCard = ({item, id}) => {
    if(id % 2 == 0){
        return (
            <div className='cardContainer container'>
                <Row className='cardBody'>
                    <Col lg={6} xs={12} className="cardImg">
                        <img
                            className="d-block w-100"
                            src="https://firebasestorage.googleapis.com/v0/b/reactfireauth-461a3.appspot.com/o/gallery%2FBlue%20Brown%20Simple%20Business%20Blog%20Banner.jpg17758240-73c2-49e9-9f04-8d3996c83e1c?alt=media&token=246f704d-1280-4db1-9765-df770cc0349e"
                            alt="Category image"
                            height="440px"
                            width="100%"
                        />
                    </Col>
                    <Col lg={6} xs={12} className="cardDes">
                        <div className='cardDesBody'>
                            <h3 className='cardH3'>{item.CategoryTitle}</h3>
                            <p className='cardP'>{item.CategoryDescription}</p>
                            <Button variant="outline-light">Learn More</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
    if(id % 2 != 0){
        return (
            <div className='cardContainer container'>
                <Row className='cardBody'>
                    <Col lg={6} xs={12} className="cardDes">
                        <div className='cardDesBody'>
                            <h3 className='cardH3'>{item.CategoryTitle}</h3>
                            <p className='cardP'>{item.CategoryDescription}</p>
                            <Button variant="outline-light">Learn More</Button>
                        </div>
                    </Col>
                    <Col lg={6} xs={12} className="cardImg">
                        <img
                            className="d-block w-100"
                            src="https://firebasestorage.googleapis.com/v0/b/reactfireauth-461a3.appspot.com/o/gallery%2FBlue%20Brown%20Simple%20Business%20Blog%20Banner.jpg17758240-73c2-49e9-9f04-8d3996c83e1c?alt=media&token=246f704d-1280-4db1-9765-df770cc0349e"
                            alt="Category image"
                            height="440px"
                            width="100%"
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CategoryCard