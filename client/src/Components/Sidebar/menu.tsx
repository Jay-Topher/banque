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
  reviews: [
    {
      comment:
        'I’ll never use my credit card anywhere Banque is available ever again. My experience is fast, the interface is great, and the customer service is excellent!',
      avi:
        'https://res.cloudinary.com/winter-cake/image/upload/w_200,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1582531963/banque/fischer_garland_lgu24b.jpg',
      name: 'Fischer Garland',
    },
    {
      comment:
        'Banque has made my transactions seamless, great customer service and free transfers. Definitely mu app of the year. Thanks Banque!',
      avi:
        'https://res.cloudinary.com/winter-cake/image/upload/w_200,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1582531963/banque/jennifer_fritz_ixhnlt.jpg',
      name: 'Jennifer Fritz',
    },
  ],
};
