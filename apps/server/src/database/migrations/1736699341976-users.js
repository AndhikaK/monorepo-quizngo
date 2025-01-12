const { Table } = require('typeorm');

module.exports = class CreateUsersTable1681234567890 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'username', type: 'varchar', isUnique: true },
          { name: 'email', type: 'varchar', isUnique: true },
          { name: 'password_hash', type: 'varchar' },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      })
    );

    // Insert dummy data into users table
    await queryRunner.query(`
      INSERT INTO users (username, email, password_hash, created_at, updated_at)
      VALUES
        ('user1', 'user1@example.com', 'hashedpassword1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('user2', 'user2@example.com', 'hashedpassword2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('user3', 'user3@example.com', 'hashedpassword3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    `);
  }

  async down(queryRunner) {
    await queryRunner.dropTable('users');
  }
};
