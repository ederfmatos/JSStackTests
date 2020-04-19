import { Model, STRING } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: STRING,
        email: STRING,
        password_hash: STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default User;
