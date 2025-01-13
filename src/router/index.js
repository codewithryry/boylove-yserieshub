import { createRouter, createWebHistory } from 'vue-router';
import { auth, db } from '../firebase'; // Import Firebase auth and Firestore
import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged
import { doc, getDoc } from 'firebase/firestore'; // For Firestore queries

const routes = [
  // Define all routes with lazy loading and meta titles
  { path: '/', component: () => import('../views/Home.vue'), name: 'Home', meta: { title: 'Home | YSeriesHub' } },
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
    path: '/admindashboard',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, title: 'Admin Dashboard | YSeriesHub' }, // Admin route
  },
  {
    path: '/blocked',
    name: 'Blocked',
    component: () => import('../components/Blocked.vue'),
    meta: { title: 'Access Denied | YSeriesHub' },
  },
  {
    path: '/underconstruction',
    name: 'UnderConstruction',
    component: () => import('../components/UnderConstruction.vue'),
    meta: { title: 'Under Construction | YSeriesHub' },
  },
  {
    path: '/undermaintenance',
    name: 'UnderMaintenance',
    component: () => import('../components/UnderMaintenance.vue'),
    meta: { title: 'Under Maintenance | YSeriesHub' },
  },
  {
    path: '/under-maintenance-not-user',
    name: 'UnderMaintenanceNotUser',
    component: () => import('../components/UnderMaintenanceNotuser.vue'),
    meta: { title: 'Under Maintenance | YSeriesHub' },
  },
  {
    path: '/ymindai',
    name: 'YMindAI',
    component: () => import('../views/YMindAI.vue'),
    meta: { requiresAuth: true, title: 'YMindAI | YSeriesHub' }, // Add meta info if needed
  },
  {
    path: '/ystream',
    name: 'YStream',
    component: () => import('../views/YStream.vue'),
    meta: { requiresAuth: true, title: 'YStream | YSeriesHub' }, // Add meta info if needed
  },
  {
    path: '/request-series',
    name: 'RequestSeries',
    component: () => import('@/views/RequestSeries.vue'), // Adjust the path as needed
    meta: { requiresAuth: true, title: 'Request Series | YSeriesHub' }, // Add meta info if needed
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../components/404.vue'),
    meta: { title: '404 - Page Not Found | YSeriesHub' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

let currentUser = null;
let isAdmin = false;

// Function to check if the user is an admin
const checkAdmin = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data().role === 'admin';
    }
  } catch (error) {
    console.error('Error checking admin status:', error);
  }
  return false;
};

// Track authentication state
onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  if (user) {
    isAdmin = await checkAdmin(user.uid);
  } else {
    isAdmin = false;
  }
});

router.beforeEach(async (to, from, next) => {
  // Wait for Firebase auth to initialize and get the current user
  const currentUser = await new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // Unsubscribe to avoid memory leaks
      resolve(user);
    });
  });

  // Check if the user is an admin
  let isAdmin = false;
  if (currentUser) {
    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid)); // Fetch user document from Firestore
      isAdmin = userDoc.exists() && userDoc.data().role === 'admin';
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  }

  // Fetch maintenance mode flag from Firestore
  let isMaintenanceMode = false; // Default to false
  try {
    const maintenanceDoc = await getDoc(doc(db, 'config', 'maintenance'));
    if (maintenanceDoc.exists()) {
      isMaintenanceMode = maintenanceDoc.data().underConstruction; // Fetch the value from Firestore
      console.log('Maintenance Mode:', isMaintenanceMode); // Debugging
    }
  } catch (error) {
    console.error('Error fetching maintenance mode:', error);
  }

  // List of routes that are exempt from maintenance mode or blocked restrictions
  const exemptRoutes = ['UnderMaintenanceNotUser', 'UnderMaintenance', 'UnderConstruction', 'NotFound', 'Blocked']; // Add route names that should be accessible

  // Check if the current route is exempt
  const isExemptRoute = exemptRoutes.includes(to.name);

  // Maintenance mode check (block all users except admins and exempt routes)
  if (isMaintenanceMode && !isAdmin && !isExemptRoute) {
    if (!currentUser) {
      // Redirect non-users to UnderMaintenanceNotUser
      next({ name: 'UnderMaintenanceNotUser' }); // Redirect to the UnderMaintenanceNotUser page
      return;
    } else {
      // Redirect authenticated non-admin users to UnderMaintenance
      next({ name: 'UnderMaintenance' }); // Redirect to the UnderMaintenance page
      return;
    }
  }

  // If maintenance mode is off, redirect to the home page
  if (!isMaintenanceMode && to.name === 'UnderMaintenanceNotUser') {
    next({ path: '/' }); // Redirect to the home page
    return;
  }

  // If maintenance mode is off, user is admin, or route is exempt, proceed with normal navigation
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest);

  // Set the page title
  const title = to.meta.title || 'YSeriesHub'; // Fallback title
  document.title = title;

  // Handle authentication
  if (requiresAuth && !currentUser) {
    next('/login'); // Block unauthenticated users
  } else if (requiresGuest && currentUser) {
    next('/blocked'); // Block authenticated users trying to access guest routes
  } else if (requiresAdmin && !isAdmin) {
    next('/blocked'); // Block non-admin users
  } else {
    next(); // Allow access to non-protected routes
  }
});

export default router;