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
  navbar: [
    {
      linkName: 'Home',
      link: '/',
    },
    {
      linkName: 'About',
      link: '/about',
    },
    {
      linkName: 'FAQs',
      link: '/faq',
    },
    {
      linkName: 'Login',
      link: '/login',
    },
    {
      linkName: 'Sign Up',
      link: '/register',
    },
  ],
  secondSection: [
    {
      icon: 'user-check',
      title: 'User Friendly',
      description:
        'Our app boasts great user experience and is easy to use on both mobile and desktop',
    },
    {
      icon: 'combination-lock',
      title: 'Secure',
      description:
        'Our app boasts great security features for both your money and personal data.',
    },
    {
      icon: 'rocket',
      title: 'Fast Transactions',
      description:
        'Transactions occur literally in seconds and you can have quick access to money when you want',
    },
  ],
};
