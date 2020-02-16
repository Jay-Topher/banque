export default {
  user: [
    {
      title: 'Dashboard',
      link: '/user',
      icon: 'dashboard',
    },
    {
      title: 'My Account',
      link: '/account',
      icon: 'wallet1, money1',
    },
    {
      title: 'Account Statement',
      link: '/statement',
      icon: 'notebook-list',
    },
    {
      title: 'Transfers',
      link: '/transfers',
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
      place: '/account',
      addClass: 'col-red',
    },
    {
      icon: 'wallet1, money1',
      description: 'Add Account',
      place: '/addaccount',
      addClass: 'col-pink',
    },
    {
      icon: 'exchange',
      description: 'Transfers',
      place: '/transfers',
      addClass: 'col-green',
    },
    {
      icon: 'notebook-list',
      description: 'History',
      place: '/statement',
      addClass: 'col-blue',
    },
  ],
};
