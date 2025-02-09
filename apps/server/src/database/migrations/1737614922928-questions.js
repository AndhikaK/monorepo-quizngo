const { Table } = require('typeorm');

module.exports = class CreateQuestions1675428934253 {
  async up(queryRunner) {
    // Create the "questions" table
    await queryRunner.createTable(
      new Table({
        name: 'questions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'question_category_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      })
    );
  }

  async down(queryRunner) {
    // Drop the foreign key
    const table = await queryRunner.getTable('questions');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('question_category_id') !== -1
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey('questions', foreignKey);
    }

    // Drop the "questions" table
    await queryRunner.dropTable('questions');
  }
};
