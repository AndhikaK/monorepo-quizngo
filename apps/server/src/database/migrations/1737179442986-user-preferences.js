const { Table, TableForeignKey } = require('typeorm');

module.exports = class UserPreferences1737179442986 {
  async up(queryRunner) {
    // Create the PostgreSQL enum types for language and display_preferences
    await queryRunner.query(`
      CREATE TYPE language_enum AS ENUM ('en', 'es', 'fr');  -- Add more languages as needed
    `);

    await queryRunner.query(`
      CREATE TYPE display_preferences_enum AS ENUM ('dark', 'light');
    `);

    // Create the `user_preferences` table
    await queryRunner.createTable(
      new Table({
        name: 'user_preferences',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false, // Foreign key column
          },
          {
            name: 'language',
            type: 'language_enum', // Use the PostgreSQL enum type
            default: "'en'",
            isNullable: false,
          },
          {
            name: 'display_preferences',
            type: 'display_preferences_enum', // Use the PostgreSQL enum type
            default: "'light'",
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
        ],
      })
    );

    // Add the foreign key constraint from `user_preferences.user_id` to `users.id`
    await queryRunner.createForeignKey(
      'user_preferences',
      new TableForeignKey({
        columnNames: ['user_id'], // Foreign key column in `user_preferences`
        referencedTableName: 'users', // Table being referenced
        referencedColumnNames: ['id'], // Column in the `users` table
        onDelete: 'CASCADE', // On delete behavior (delete preferences if user is deleted)
        onUpdate: 'CASCADE', // On update behavior (update preferences if user id changes)
      })
    );
  }

  async down(queryRunner) {
    // Drop the foreign key constraint first
    const table = await queryRunner.getTable('user_preferences');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1
    );
    await queryRunner.dropForeignKey('user_preferences', foreignKey);

    // Drop the `user_preferences` table
    await queryRunner.dropTable('user_preferences');

    // Drop the enum types
    await queryRunner.query('DROP TYPE language_enum');
    await queryRunner.query('DROP TYPE display_preferences_enum');
  }
};
