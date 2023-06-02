const createError = require('http-errors');
const users = require('../data/users.json');
const fileHandlerHelper = require('../helpers/fileHandlerHelper');

/* System file khởi chạy thì nó đứng ngay thư mục root server */
const fileNameUsers = './src/data/users.json';
console.log(fileNameUsers);

// Get all users
exports.getAllUsers = async () => {
  return users;
};

// Get a user by ID
exports.getUserById = async (req) => {
  try {
    const { id } = req.params;
    const user = users.find((user) => user.id === id);

    console.log(id, user);

    if (!user) {
      throw createError(404, 'User not found');
    }

    return user;
  } catch (err) {
    throw createError(500, err.message);
  }
};

// Create a new user
exports.createUser = async (req) => {
  console.log('createUser');

  try {
    let payload = {
      id: 4,
      name: req.body.name,
      email: req.body.email,
      password: '123456',
    };
    newUsers = [...users, payload];
    //Ghi lại file
    fileHandlerHelper.write(fileNameUsers, newUsers);
    return newUsers;

    
  } catch (err) {
    throw createError(500, err.message);
  }
};

// Update a user by ID
exports.updateUserById = async (req) => {
  try {
    const { id } = req.params;

    
    /* Check exits user by id */
    const user = users.find((user) => user.id === parseInt(id));

    if (!user) {
      throw createError(404, `User not found with ID ${id}`);
    }

    /**
     * Lặp qua mảng, tìm user có id để update
     * trả lại mảng mới sau khi update
     */
    const newUsers = users.map((user) => {
      if (user.id === parseInt(id)) {
        if (req.body.email) user.email = req.body.email;
        if (req.body.name) user.name = req.body.name;
      }
      return user;
    });

    console.log('after', newUsers);

    //Ghi lại file
    fileHandlerHelper.write(fileNameUsers, newUsers);

    return newUsers;

    
  } catch (err) {
    throw createError(500, err.message);
  }
};

// Delete a user by ID
exports.deleteUserById = async (req) => {
  console.log('deleteUserById');

  try {
    const { id } = req.params;


    /* Check exits user by id */
    const user = users.find((user) => user.id === parseInt(id));

    if (!user) {
      throw createError(404, `User not found with ID ${id}`);
    }

    /**
     * Lặp qua mảng, tìm user có id để update
     * trả lại mảng mới sau khi update
     */
    const newUsers = users.filter((user) => user.id !== parseInt(id));

    console.log('after', newUsers);

    //Ghi lại file
    fileHandlerHelper.write(fileNameUsers, newUsers);

    return newUsers;

    
  } catch (err) {
    throw createError(500, err.message);
  }
};
