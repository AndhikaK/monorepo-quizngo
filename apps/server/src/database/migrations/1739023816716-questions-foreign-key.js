const { TableForeignKey } = require("typeorm");

module.exports = class QuestionsForeignKey1739023816716 {
  async up(queryRunner) {
    // Add a foreign key constraint to "question_category_id"
    await queryRunner.createForeignKey(
      'questions',
      new TableForeignKey({
        columnNames: ['question_category_id'], // Column in the questions table
        referencedColumnNames: ['id'], // Column in the question_categories table
        referencedTableName: 'question_categories', // Referenced table
        onDelete: 'CASCADE', // Cascade on delete
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
  }
};
