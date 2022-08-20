module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "user_progress",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      course_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "courses",
          key: "id",
        },
      },
      section_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "sections",
          key: "id",
        },
      },
      sub_section_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "sub_sections",
          key: "id",
        },
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
      tableName: "user_progress",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true,
    }
  );
};
