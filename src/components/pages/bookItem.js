"use strict"
 import React from 'react';
 import {Image, Row, Col, Well, Button} from 'react-bootstrap';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';
 import {addToCart, updateCart} from '../../actions/cartActions';


class BookItem extends React.Component {
  handleCart(){
    const book=[...this.props.cart, {
      _id:this.props._id,
      title:this.props.title,
      description:this.props.description,
      images: this.props.images,
      price:this.props.price,
      quantity: 1
    }]
    console.log("I am here", this.props.cart.length);
    //CHECK IF CART IF empty
    if (this.props.cart.length > 0){
          let _id = this.props._id;
          let cartIndex = this.props.cart.findIndex(function(cart){
            return cart._id === _id;
          })
          //if return -1 ,there is no items with same ID
          if (cartIndex === -1){
            this.props.addToCart(book);
          }else {
            //We only need to update quantity
            this.props.updateCart(_id, 1, this.props.cart);
          }
    }else {
      //Cart is empty
        this.props.addToCart(book);
    }
  }

  constructor(){
    super();
    this.state = {
      isClicked: false
    };
  }
  onReadMore(){
    this.setState({
      isClicked: true
    });
  }

  onReadLess(){
    this.setState({
      isClicked: false
    });
  }
   render(){
     return (
       <Well>
        <Row>
          <Col xs={12} sm={4} >
            <Image src={this.props.images} responsive />
          </Col>
          <Col xs={6} sm={8} >
            <h6>{this.props.title}</h6>
            <p>{ (this.props.description.length > 50 && this.state.isClicked === false) ? (this.props.description.substring(0, 50)):
               (this.props.description) }
               <button className='link' onClick = {this.onReadMore.bind(this)} >
               {(this.state.isClicked === false && this.props.description !== null && this.props.description.length > 50)? ('>>read more'):('')}
               </button>
               <button className='link' onClick = {this.onReadLess.bind(this)} >
               {(this.state.isClicked === true && this.props.description !== null && this.props.description.length > 50)? ('<<read less'):('')}
               </button>
            </p>
            <h6>usd. {this.props.price} </h6>
            <Button onClick={this.handleCart.bind(this)} bsStyle='primary'>Buy Now</Button>
          </Col>
        </Row>
      </Well>
     )
   }
 }

 function mapStateToProps(state){
   return {
     cart: state.cart.cart,
   }
 }

 function mapDispatchToProps(dispatch){
   return bindActionCreators({addToCart, updateCart}, dispatch)
 }
export default connect(mapStateToProps, mapDispatchToProps)(BookItem);
