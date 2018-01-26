"use strict"

//BOOKS REDUCERS
export function booksReducers(state={books:[]}, action) {
// state = {books:
//   [{
//     _id:1,
//     title:'this is the book title',
//     description: 'this is the book description',
//     price: 45.33
//   },{
//     _id:2,
//     title:'this is the second book title',
//     description: 'this is the second book description',
//     price:50
//   }]}
  switch (action.type) {
      case "GET_BOOKS":
      // let books = state.books.concat(action.payload);
      //return {books};
      // console.log("I am here", [...state]);
      return {...state, books:[...action.payload]}
      break;
      case "POST_BOOK":
      // let books = state.books.concat(action.payload);
      //return {books};
      return {...state,
            books: [...state.books, ...action.payload],
            msg: 'Saved! Click to continue',
            style:'success',
            validation:'success'}
      break;
      case "POST_BOOK_REJECTED":
      // let books = state.books.concat(action.payload);
      //return {books};
      return {...state,
              msg: 'Please, try Again',
              style:'danger',
              validation: 'error'}
      break;
      case "RESET_BUTTON":
      // let books = state.books.concat(action.payload);
      //return {books};
      return {...state,
              msg:null,
              style:'primary',
              validation: 'null'}
      break;
      case "DELETE_BOOK":
      //Create a copy of the current array of books
      const currentBookToDelete = [...state.books]
      //Determine at which index in books array is the book to be deleted
      const indexToDelete = currentBookToDelete.findIndex(
        function(book){
        //  return book._id == action.payload;
          return book._id.toString() === action.payload;
        }
      )
      //use slice to remove the book at the specified index
      return {books: [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)]}
      break;
      case "UPDATE_BOOK":
      const currentBookToUpdate =[...state.books];
      //Determine at which index in books array is the book to be deleted
      const indexToUpdate = currentBookToUpdate.findIndex(
        function(book){
          return book._id === action.payload._id;
        }
      )

      // Create a new book object with new value and with the same array index of the item we want to
      // replace. To achieve this we will use ...spread but we could se concat method as well
      const newBookToUpdate ={
        ...currentBookToUpdate[indexToUpdate],
        title:action.payload.title
      }
    //  console.log("What is newBookToUpdate". newBookToUpdate);
      return {books: [...currentBookToUpdate.slice(0, indexToUpdate),newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)]}
      break;
    }
    return state;

}
