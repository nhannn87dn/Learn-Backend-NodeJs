import users from '../data/user.json';

const getById = async (id: number)=>{
  //Được coi là logic xử lý
  const user = users.find(user=>user.id === id);

  return user;

}

export default {
  getById
}