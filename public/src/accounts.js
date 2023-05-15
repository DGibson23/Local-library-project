function findAccountById(accounts, id) {
  return accounts.reduce((foundAccount, account) => {
    if (foundAccount === null && account.id === id) {
      foundAccount = account;
    }
    return foundAccount;
  }, null);
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountsA, accountsB) =>
    accountsA.name.last < accountsB.name.last ? -1 : 1
  );
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  let numberOfTimeIdShowsInBorrowed = 0;
  for (let i = 0; i < books.length; i++) {
    for (let x = 0; x < books[i].borrows.length; x++) {
      if (account.id === books[i].borrows[x].id) {
        numberOfTimeIdShowsInBorrowed++;
      }
    }
  }
  return numberOfTimeIdShowsInBorrowed;
}

function getBooksPossessedByAccount(account, books, authors) {
  const borrowing = books.filter((book) => {
    return book.borrows.find(
      (person) => person.id == account.id && person.returned == false
    );
  });

  const findAuthor = (id) => {
    return authors.find((writer) => writer.id == id);
  };

  return borrowing.map((book) => {
    return {
      ...book,
      author: findAuthor(book.authorId),
    };
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
