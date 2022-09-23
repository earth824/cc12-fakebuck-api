'use strict';

const { FRIEND_ACCEPTED, FRIEND_PENDING } = require('../config/constants');

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    // 1, 2, 7, 13, 32, 33
    return queryInterface.bulkInsert('friends', [
      {
        status: FRIEND_ACCEPTED,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 1,
        accepter_id: 2
      },
      {
        status: FRIEND_ACCEPTED,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 7,
        accepter_id: 2
      },
      {
        status: FRIEND_ACCEPTED,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 13,
        accepter_id: 2
      },
      {
        status: FRIEND_ACCEPTED,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 2,
        accepter_id: 32
      },
      {
        status: FRIEND_ACCEPTED,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 33,
        accepter_id: 2
      },
      {
        status: FRIEND_PENDING,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 33,
        accepter_id: 1
      },
      {
        status: FRIEND_PENDING,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 1,
        accepter_id: 7
      },
      {
        status: FRIEND_PENDING,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 1,
        accepter_id: 36
      },
      {
        status: FRIEND_PENDING,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 36,
        accepter_id: 2
      },
      {
        status: FRIEND_PENDING,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 33,
        accepter_id: 36
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('friends', null, {});
  }
};
