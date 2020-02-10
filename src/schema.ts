import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLID,
} from 'graphql';

import userType from './types/users';
import { viewAllAccounts, viewAnAccount } from './controllers/accounts';
import { getAllUsers, getAUser } from './controllers/user';
import accountType from './types/accounts';

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'The query root of Users.',
  fields: () => ({
    users: {
      type: new GraphQLList(userType),
      description: 'Get all users details',
      resolve: () => getAllUsers(),
    },
    user: {
      type: userType,
      description: 'Get a single user details',
      args: {
        userId: { type: GraphQLID },
      },
      resolve(_parent, { userId }) {
        return getAUser(userId);
      },
    },
    accounts: {
      type: new GraphQLList(accountType),
      description: 'Get all accounts of users(Admin view only)',
      resolve: parent => {
        console.log(parent);
        return viewAllAccounts();
      },
    },
    account: {
      type: accountType,
      description: 'Get a user account detail(Admin view only)',
      args: {
        accountId: { type: GraphQLID },
      },
      resolve(parent, { accountId }) {
        console.log(parent);
        return viewAnAccount(accountId);
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query,
});

export default schema;
