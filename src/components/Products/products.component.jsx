import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './products.styles.css';

function Products(props) {
    const {blockSize, items} = props
    return (
        <section className="products">
            <Container>
                {props.children}
                <nav>
                    <Row>
                        {
                            items.map( (item, idx) => (
                                <Col md={blockSize} key={idx} >
                                    <Link className="product-link" to={`${item.link}`}>
                                        <div className={`${item.icon}`}></div>
                                        <h3>{item.heading}</h3>
                                        <p>{item.description}</p>
                                    </Link>
                                </Col>
                            ))
                        }
                        
                    </Row>
                </nav>
            </Container>
        </section>
    )
}

export default Products;
