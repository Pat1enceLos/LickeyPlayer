export const INFO_DB_NAME = 'Info';
export const USER_OBJECTSTORE_NAME = 'User';
export const PLAYLIST_OBJECTSTORE_NAME = 'AudioInfo';
export const INFO_DB_VERSION = 1;

export const INFO_DB_SCHEMA = [
  {
    version: 1,
    schema: [
      {
        name: USER_OBJECTSTORE_NAME,
        options: {
          keyPath: 'id',
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
            gender: 'gender',
            unique: false,
          },
          {
            description: 'description',
            unique: false,
          },
        ],
      },
      {
        name: PLAYLIST_OBJECTSTORE_NAME,
        options: {
          keyPath: 'id',
          autoIncrement: true,
        },
        indexes: [
          {
            playlistQueue: 'playlistQueue',
            unique: false,
          },
          {
            musicLibraryPlaylist: 'musicLibraryPlaylist',
            unique: false,
          },
          {
            createdPlaylist: 'createdPlaylist',
            unique: false,
          },
          {
            audioInfo: 'audioInfo',
            unique: false,
          },
        ],
      },
    ],
  },
];
