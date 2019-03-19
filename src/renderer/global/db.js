export const INFO_DB_NAME = 'Info';
export const USER_OBJECTSTORE_NAME = 'User';
export const INFO_DB_VERSION = 1;

export const INFO_DB_SCHEMA = [
  {
    version: 1,
    schema: [
      {
        name: USER_OBJECTSTORE_NAME,
        options: {
          autoIncrement: true,
        },
        indexes: [
          {
            userID: 'id',
            unique: false,
          },
          {
            password: 'password',
            unique: false,
          },
          {
            name: 'name',
            unique: false,
          },
          {
            age: 'age',
            unique: false,
          },
          {
            description: 'description',
            unique: false,
          },
        ],
      },
    ],
  },
];
