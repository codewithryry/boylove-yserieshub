import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../firebase'; // Import Firebase auth

// Import all your components
import Home from '../views/Home.vue';
import Recommendations from '../views/Recommendations.vue';
import About from '../views/About.vue';
import SeriesDetail from '../views/SeriesDetail.vue';
import Pricing from '../views/Pricing.vue';
import Contact from '../views/Contact.vue';
import GetStarted from '../views/GetStarted.vue';
import FAQ from '../views/FAQ.vue';
import PaymentPage from '../views/Payment.vue';
import Discussion from '../views/Discussion.vue';
import Songs from '../views/Songs.vue';
import ThaiEngTranslator from '../views/ThaiEngTranslator.vue';
import LiveWatchParty from '../views/WatchParty.vue';
import Blog from '../views/BlogPage.vue';
import BlogPost from '../views/BlogPost.vue';
import NotFound from '../views/404.vue';
import Login from '../views/Login.vue';
import Profile from '../views/Profile.vue'; // Import the Profile component
import EditProfile from '../views/EditProfile.vue'; // Import the EditProfile component


const routes = [
  { path: '/', component: Home },
  { path: '/recommendations', component: Recommendations },
  { path: '/about', component: About },
  { path: '/series/:id', component: SeriesDetail, props: true },
  { path: '/pricing', component: Pricing },
  { path: '/contact', component: Contact },
  {
    path: '/get-started',
    name: 'GetStarted',
    component: GetStarted,
  },
  { path: '/faq', component: FAQ },
  {
    path: '/payment',
    component: PaymentPage,
    props: (route) => ({ subscription: route.query.subscription }), // Pass subscription instead of plan
  },
  { path: '/feedback', component: Discussion },
  { path: '/songs', component: Songs },
  { path: '/thailator-ai', component: ThaiEngTranslator },
  { path: '/blog', component: Blog },
  {
    path: '/blog/:id',
    component: BlogPost,
    props: true,
  },
  {
    path: '/live',
    component: LiveWatchParty,
  },
  {
    path: '/watch-party/:playlistId/:title',
    name: 'WatchParty',
    component: LiveWatchParty,
    props: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }, // Only accessible to guests (non-authenticated users)
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }, // Protect this route
  },
  {
    path: '/edit-profile',
    name: 'EditProfile',
    component: EditProfile,
    meta: { requiresAuth: true }, // Protect this route
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard to protect routes that require authentication
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest);

  // Use onAuthStateChanged to get the current user asynchronously
  const currentUser = await new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      resolve(user);
      unsubscribe(); // Unsubscribe after resolving
    });
  });

  if (requiresAuth && !currentUser) {
    // Redirect to login if the route requires authentication and the user is not logged in
    next('/login');
  } else if (requiresGuest && currentUser) {
    // Redirect authenticated users away from guest-only routes (e.g., login page)
    next('/profile');
  } else {
    // Allow access to the route
    next();
  }
});

export default router;