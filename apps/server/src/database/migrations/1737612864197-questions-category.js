const { Table } = require('typeorm');

module.exports = class CreateQuestionCategory1675428934253 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'question_categories',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
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
    await queryRunner.dropTable('question_category');
  }
};
