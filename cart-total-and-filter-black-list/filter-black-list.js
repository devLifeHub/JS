function filter(listAllEmail, listBlackEmail) {
  let listWhiteEmail = [];
  for (let email of listAllEmail) {
    if (listBlackEmail.includes(email) !== true) {
      listWhiteEmail.push(email);
    }
  }
  return listWhiteEmail;
}

export default filter;
