const { TableColumn } = require('typeorm');

module.exports = class AddDisplayPictureUrlColumn1736865117097 {
  async up(queryRunner) {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'display_picture_url',
        type: 'varchar',
        isNullable: true,
      })
    );
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('users', 'display_picture_url');
  }
};
