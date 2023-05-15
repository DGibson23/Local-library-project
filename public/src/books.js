function findAuthorById(authors, id) {
  let foundAuthorID = {}
  for(let i=0; i<authors.length; i++){
    if(id === authors[i].id){
      foundAuthorID = authors[i]
    }
  } return foundAuthorID;
}

// function findBookById(books, id) {
//   let foundBookID = {}
//   for (let i=0; i<books.length; i++){
//     if(id === books[i].id){
//       foundBookID = books[i];
//     }
//   } return foundBookID;
// }

function findBookById(books, id){
  let foundBookID = books.find((book) => book.id == id);
  return foundBookID;
}


function partitionBooksByBorrowedStatus(books) {
    const returnedBooks = [];
    const notReturnedBooks = [];
  
    books.forEach(function(book) {
      if (book.borrows.some(function(borrow) {
        return borrow.returned === false;
      })) {
        notReturnedBooks.push(book);
      } else {
        returnedBooks.push(book);
      }
      });
  
    return [notReturnedBooks, returnedBooks];
  }

  function getBorrowersForBook(book, accounts) {
    let borrowers = []
    let authorData = {}
    let result = []
  
    book.borrows.forEach((borrow) => {
      authorData = accounts.find((author) => author.id == borrow.id);
      newObject = {
        ...borrow,
        ...authorData
      };
      borrowers.push(newObject);
  
    })
  
    if (borrowers.length <= 10) {
      for (let i = 0; i < borrowers.length; i++) {
        result[i] = borrowers[i]
      }
    } else {
      for (let i = 0; i < 10; i++) {
        result[i] = borrowers[i]
      }
    }
    return result
  }
  

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
