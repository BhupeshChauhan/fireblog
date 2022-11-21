import React from 'react'
import { Col, Row } from 'react-bootstrap'
import "./VerticalCard.css"

const VerticalCard = ({item, id}) => {
    const DateTime = item.DateTime.toDate();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    console.log(item)
    if(id % 2 == 0){
        return (
            <div className='cardContainer container'>
                <Row className='cardBody'>
                    <Col lg={6} xs={12} className="cardImg">
                        <img
                            className="d-block w-100"
                            src={item.FeatureImage.fileUrl}
                            alt={item.FeatureImage.fileName}
                            height="440px"
                            width="100%"
                            />
                    </Col>
                    <Col lg={6} xs={12} className="cardDes">
                        <div className='cardDesBody'>
                            <div style={{display: "flex"}}>
                                <p className="cardAuthor">by {item.Author}</p>
                                <p className="cardDate">{months[DateTime.getMonth()]} {DateTime.getDate()}, {DateTime.getFullYear()}</p>
                            </div>
                            <a href={`/Blog/${item.uid}`}> 
                            <h3 className='cardH3'>{item.BlogTitle}</h3>
                            </a>
                            <p className='cardP'>{item.BlogDescription}</p>
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
                            <div style={{display: "flex"}}>
                                <p className="cardAuthor">by {item.Author}</p>
                                <p className="cardDate">{months[DateTime.getMonth()]} {DateTime.getDate()}, {DateTime.getFullYear()}</p>
                            </div>
                            <a href={`/Blog/${item.uid}`}>
                                <h3 className='cardH3'>{item.BlogTitle}</h3>
                            </a>
                            <p className='cardP'>{item.BlogDescription}</p>
                        </div>
                    </Col>
                    <Col lg={6} xs={12} className="cardImg">
                        <img
                            className="d-block w-100"
                            src={item.FeatureImage.fileUrl}
                            alt={item.FeatureImage.fileName}
                            height="440px"
                            width="100%"
                            />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default VerticalCard