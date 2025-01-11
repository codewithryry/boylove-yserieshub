import { createRouter, createWebHistory } from 'vue-router';
import { auth, db } from '../firebase'; // Import Firebase auth and Firestore
import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged
import { doc, getDoc } from 'firebase/firestore'; // For Firestore queries

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
    component: () => import('../views/YChat.vue'),
    meta: { requiresAuth: true, title: 'YChat | YSeriesHub' },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, title: 'Admin | YSeriesHub' }, // Admin route
  },
  {
    path: '/blocked',
    name: 'Blocked',
    component: () => import('../views/Blocked.vue'),
    meta: { title: 'Access Denied | YSeriesHub' },
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

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest);

  // Set the page title
  const title = to.meta.title || 'YSeriesHub'; // Fallback title
  document.title = title;

  // Wait for Firebase auth to initialize and get the current user
  const currentUser = await new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // Unsubscribe to avoid memory leaks
      resolve(user);
    });
  });

  // Handle authentication
  if (requiresAuth && !currentUser) {
    next('/Login'); // Block unauthenticated users
  } else if (requiresGuest && currentUser) {
    next('/blocked'); // Block authenticated users trying to access guest routes
  } else if (requiresAdmin) {
    // Check if the user is an admin
    if (currentUser) {
      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid)); // Fetch user document from Firestore

        // Debugging logs
        console.log('Current user:', currentUser);
        console.log('User document:', userDoc?.data());
        console.log('User role:', userDoc?.data()?.role);

        if (userDoc.exists() && userDoc.data().role === 'admin') {
          next(); // Allow access to the Admin page
        } else {
          next('/blocked'); // Block non-admin users
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        next('/blocked'); // Block in case of an error
      }
    } else {
      next('/blocked'); // Block unauthenticated users trying to access admin routes
    }
  } else {
    next(); // Allow access to non-protected routes
  }
});

export default router;