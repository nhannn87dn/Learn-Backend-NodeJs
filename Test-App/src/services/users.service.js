const createError = require('http-errors');
const users = [
  { id: 1, name: 'Jonh', email: 'jonh@gmail.com' },
  { id: 2, name: 'Dara', email: 'dara@gmail.com' },
  { id: 3, name: 'Tim', email: 'tim@gmail.com' },
];

// Get all users
exports.getAllUsers = async () => {
  return users;
};

// Get a user by ID
exports.getUserById = async (req) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw createError(400, 'Missing user ID');
    }

    const user = await users.find((user) => user.id === id);

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
exports.createUser = async () => {
  console.log('createUser');
  return users;
};

// Update a user by ID
exports.updateUserById = async () => {
  console.log('updateUserById');
  return users;
};

// Delete a user by ID
exports.deleteUserById = async () => {
  console.log('deleteUserById');
  return users;
};
