export default {
  user: [
    {
      title: 'Dashboard',
      link: '/dashboard',
      icon: 'dashboard',
    },
    {
      title: 'My Account',
      link: '/dashboard/account',
      icon: 'wallet1, money1',
    },
    {
      title: 'Account Statement',
      link: '/dashboard/statement',
      icon: 'notebook-list',
    },
    {
      title: 'Transfers',
      link: '/dashboard/transfers',
      icon: 'exchange',
    },
    {
      title: 'Logout',
      link: '/',
      icon: 'exit',
    },
  ],
  dashCards: [
    {
      icon: 'wallet1, money1',
      description: 'My Account',
      place: '/dashboard/account',
      addClass: 'col-red',
    },
    {
      icon: 'wallet1, money1',
      description: 'Add Account',
      place: '/dashboard/addaccount',
      addClass: 'col-pink',
    },
    {
      icon: 'exchange',
      description: 'Transfers',
      place: '/dashboard/transfers',
      addClass: 'col-green',
    },
    {
      icon: 'notebook-list',
      description: 'History',
      place: '/dashboard/statement',
      addClass: 'col-blue',
    },
  ],
};
