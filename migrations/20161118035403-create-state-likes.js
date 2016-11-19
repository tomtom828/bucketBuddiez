// 'use strict';
// module.exports = {
//   up: function(queryInterface, Sequelize) {
//     return queryInterface.createTable('StateLikes', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       // Foreign key usage (added manually)
//       userId: {
//         type: Sequelize.INTEGER,
//         references: {
//             model: 'Users',
//             key: 'id'
//         },
//         onUpdate: 'cascade',
//         onDelete: 'cascade'
//       },
//       // Foreign key usage (added manually)
//       stateId: {
//         type: Sequelize.INTEGER,
//         references: {
//             model: 'States',
//             key: 'id'
//         },
//         onUpdate: 'cascade',
//         onDelete: 'cascade'
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       }
//     });
//   },
//   down: function(queryInterface, Sequelize) {
//     return queryInterface.dropTable('StateLikes');
//   }
// };