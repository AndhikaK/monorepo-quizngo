const { Table } = require('typeorm');

module.exports = class CreateUsersTable1681234567890 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v1()',
          },
          { name: 'name', type: 'varchar' },
          { name: 'email', type: 'varchar', isUnique: true },
          { name: 'password', type: 'varchar' },
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
      INSERT INTO users (name, email, password, created_at, updated_at)
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
