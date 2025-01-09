import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../firebase'; // Import Firebase auth

const routes = [
  // Define all routes with lazy loading and meta titles
  { path: '/', component: () => import('../views/Home.vue'), meta: { title: 'Home | YSeriesHub' } },
  { path: '/recommendations', component: () => import('../views/Recommendations.vue'), meta: { title: 'Series | YSeriesHub' } },
  { path: '/about', component: () => import('../views/About.vue'), meta: { title: 'About Us | YSeriesHub' } },
  { path: '/series/:id', component: () => import('../views/SeriesDetail.vue'), props: true, meta: { title: 'Series Details | YSeriesHub' } },
  { path: '/pricing', component: () => import('../views/Pricing.vue'), meta: { title: 'Pricing | YSeriesHub' } },
  { path: '/contact', component: () => import('../views/Contact.vue'), meta: { title: 'Contact Us | YSeriesHub' } },
  {
    path: '/get-started',
    name: 'GetStarted',
    component: () => import('../views/GetStarted.vue'),
    meta: { title: 'Get Started | YSeriesHub' },
  },
  { path: '/faq', component: () => import('../views/FAQ.vue'), meta: { title: 'FAQ | YSeriesHub' } },
  {
    path: '/payment',
    component: () => import('../views/Payment.vue'),
    props: (route) => ({ subscription: route.query.subscription }),
    meta: { title: 'Payment | YSeriesHub' },
  },
  { path: '/feedback', component: () => import('../views/Discussion.vue'), meta: { title: 'Feedback | YSeriesHub' } },
  { path: '/songs', component: () => import('../views/Songs.vue'), meta: { title: 'Musics | YSeriesHub' } },
  { path: '/thailator-ai', component: () => import('../views/ThaiEngTranslator.vue'), meta: { title: 'Thai-Eng Translator | YSeriesHub' } },
  { path: '/blog', component: () => import('../views/BlogPage.vue'), meta: { title: 'Blog | YSeriesHub' } },
  {
    path: '/blog/:id',
    component: () => import('../views/BlogPost.vue'),
    props: true,
    meta: { title: 'Blog Post | YSeriesHub' },
  },
  {
    path: '/live',
    component: () => import('../views/WatchParty.vue'),
    meta: { title: 'Live Watch Party | YSeriesHub' },
  },
  {
    path: '/watch-party/:playlistId/:title',
    name: 'WatchParty',
    component: () => import('../views/WatchParty.vue'),
    props: true,
    meta: { title: 'Watch Party | YSeriesHub' },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { requiresGuest: true, title: 'Login | YSeriesHub' },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: { requiresAuth: true, title: 'Profile | YSeriesHub' },
  },
  {
    path: '/ychat',
    name: 'YChat',
    component: () => import('../views/YChat.vue'), // Add YChat route
    meta: { requiresAuth: true, title: 'YChat | YSeriesHub' }, // Restrict to logged-in users
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/404.vue'),
    meta: { title: '404 - Page Not Found' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard for Authentication and Page Titles
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest);

  // Get the current user
  const currentUser = await new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      resolve(user);
      unsubscribe(); // Unsubscribe after resolving
    });
  });

  // Set the page title
  const title = to.meta.title || 'My App'; // Fallback title (you can change this to whatever you want)
  document.title = title;

  // Handle authentication
  if (requiresAuth && !currentUser) {
    next('/login');
  } else if (requiresGuest && currentUser) {
    next('/profile');
  } else {
    next();
  }
});

export default router;