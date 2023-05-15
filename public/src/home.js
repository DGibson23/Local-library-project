function getTotalBooksCount(books) {
  let bookCount = 0;
  for (let i = 0; i < books.length; i++) {
    bookCount++;
  }
  return bookCount;
}

function getTotalAccountsCount(accounts) {
  let accountTotalCount = 0;
  for (let i = 0; i < accounts.length; i++){
    accountTotalCount ++;
  }
  return accountTotalCount;
}

function getBooksBorrowedCount(books) {
  let booksCurrentlyCheckedOut = 0;
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i].borrows.length; j++) {
      if (books[i].borrows[j].returned === false) {
        booksCurrentlyCheckedOut++;
      }
    }
  }
  return booksCurrentlyCheckedOut;
}


function getAllBookGenres(books) {
  let commonGenres = [];
  let allBooksGenres = books.map((book) => book.genre);

  allBooksGenres.forEach((genre) => {
    if (!commonGenres.includes(genre)) {
      commonGenres.push(genre)
    }
  })
  return commonGenres;
}


function getMostCommonGenres(books) {
  let mostCommonGenres = [];
  let result = [];
  let commonGenres = getAllBookGenres(books); //CALLING HELPER FUNCTION

  commonGenres.forEach((genre) => {
    let count = 0;
    books.map((book) => {
      if (book.genre == genre) {
        count += 1
      }
    })

    mostCommonGenres.push({
      name: genre,
      ["count"]: count
    })
  })

  mostCommonGenres = mostCommonGenres.sort((genre1, genre2) => genre2.count - genre1.count)
  for (let i = 0; i < 5; i++) {
    result.push(mostCommonGenres[i])
  }
  return result
}


function getMostPopularBooks(books) {
    const sortedBooks = books.sort((a, b) => b.borrows.length - a.borrows.length);
    const mostPopularBooks = sortedBooks.slice(0, 5);
    const popularBooksData = mostPopularBooks.map(book => {
      return {
        name: book.title,
        count: book.borrows.length
      };
    });
  
   return popularBooksData;
}

function getMostPopularAuthors(books, authors) {
  const borrowCountByAuthor = {};

  books.forEach(book => {
    const author = authors.find(author => author.id === book.authorId);
    if (author) {
      const borrowCount = book.borrows.length;
      borrowCountByAuthor[author.id] = (borrowCountByAuthor[author.id] || 0) + borrowCount;
    }
  });

  const sortedAuthors = Object.keys(borrowCountByAuthor)
    .sort((a, b) => borrowCountByAuthor[b] - borrowCountByAuthor[a])
    .slice(0, 5)
    .map(authorId => {
      const author = authors.find(author => author.id === Number(authorId));
      return {
        name:  author.name.first + " " + author.name.last,
        count: borrowCountByAuthor[authorId]
      };
    });
  return sortedAuthors;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
