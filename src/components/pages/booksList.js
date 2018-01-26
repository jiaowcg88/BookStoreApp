"use strict"
// display a list of books
import React from 'react';
import {connect} from 'react-redux';
import {getBooks} from '../../actions/booksActions';
import {bindActionCreators} from 'redux';
import {Carousel, Grid, Col, Row, Button} from 'react-bootstrap';

import BookItem from './bookItem';
import BooksForm from './booksForm';
import Cart from './cart';

class BooksList extends React.Component{
  componentDidMount(){
   console.log(" BOOK LISTS",this.props.getBooks());
    this.props.getBooks()
  }

  render(){
    const booksList = this.props.books.map(function(booksArr){
      return (
        <Col xs={12} sm={6} md={4} key={booksArr._id} >
          <BookItem
              _id={booksArr._id}
              title={booksArr.title}
              description={booksArr.description}
              images= {booksArr.images}
              price={booksArr.price} />
        </Col>
        )
      })
    return (
      <Grid>
        <Row>
            <Carousel>
                <Carousel.Item>
                  <img width={900} height={400} alt="900x400" src="/images/home1.jpg" />
                  <Carousel.Caption>
                    <h3>Love reading book</h3>
                    <p>Welcome to book Store and choose your favority book</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img width={900} height={400} alt="900x400" src="/images/home2.jpg" />
                  <Carousel.Caption>
                    <h3>Reading book make you happy</h3>
                    <p>Enjoy reading books</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img width={900} height={400} alt="900x400" src="/images/home3.jpg" />
                  <Carousel.Caption>
                    <h3>Reading books broaden our views</h3>
                    <p>Come and join us</p>
                  </Carousel.Caption>
                </Carousel.Item>
         </Carousel>
        </Row>
        <Row >
          <Cart />
        </Row>
        <Row style={{marginTop:"15px"}}>
          {booksList}
        </Row>
      </Grid>
    )
  }
}
function mapStateToProps(state){
  return {
    books: state.books.books
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getBooks : getBooks
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
