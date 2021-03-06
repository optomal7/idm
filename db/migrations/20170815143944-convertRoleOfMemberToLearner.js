/* eslint-disable no-use-extend-native/no-use-extend-native */

const OLD_ROLE_MEMBER = 'member'
const NEW_ROLE_LEARNER = 'learner'

export function up(r, conn) {
  return r.table('users')
    .getAll(OLD_ROLE_MEMBER, {index: 'roles'})
    .update(user => ({
      roles: user('roles')
      .setDifference([OLD_ROLE_MEMBER])
      .setUnion([NEW_ROLE_LEARNER])
    }))
    .run(conn)
}

export function down(r, conn) {
  return r.table('users')
    .getAll(OLD_ROLE_MEMBER, {index: 'roles'})
    .update(user => ({
      roles: user('roles')
      .setDifference([NEW_ROLE_LEARNER])
      .setUnion([OLD_ROLE_MEMBER])
    }))
    .run(conn)
}
