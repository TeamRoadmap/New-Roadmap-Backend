module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "course_types",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      public_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "course_types",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true,
    }
  );
};
