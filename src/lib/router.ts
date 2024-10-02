import { createRouter, createWebHashHistory } from 'vue-router';

const CategoryList = () => import('../pages/Category/CategoryList.vue' as any);

const routes = [
  {
    path: '/',
    name: 'Category List',
    component: CategoryList,
  },
  {
    path: '/category-read/:id',
    name: 'Category Read',
    component: () => import('../pages/Category/CategoryRead.vue' as any), // lazy-loaded for fast response time
  },
  {
    path: '/category-edit/:id',
    name: 'Category Edit',
    component: () => import('../pages/Category/CategoryEdit.vue' as any), // lazy-loaded for fast response time
  },
  {
    path: '/category-create/:id',
    name: 'Category Create',
    component: () => import('../pages/Category/CategoryCreate.vue' as any), // lazy-loaded for fast response time
  },
  {
    path: '/item-read/:id',
    name: 'Item Read',
    component: () => import('../pages/Item/ItemRead.vue' as any), // lazy-loaded for fast response time
  },
  {
    path: '/item-edit/:id',
    name: 'Item Edit',
    component: () => import('../pages/Item/ItemEdit.vue' as any), // lazy-loaded for fast response time
  },
  {
    path: '/item-create/:id',
    name: 'Item Create',
    component: () => import('../pages/Item/ItemCreate.vue' as any), // lazy-loaded for fast response time
  },
  {
    path: '/subcategory-read/:id',
    name: 'SubCategory Read',
    component: () => import('../pages/SubCategory/SubCategoryRead.vue' as any), // lazy-loaded for fast response time
  },
  {
    path: '/subcategory-edit/:id',
    name: 'SubCategory Edit',
    component: () => import('../pages/SubCategory/SubCategoryEdit.vue' as any), // lazy-loaded for fast response time
  },
  {
    path: '/subcategory-create/:id',
    name: 'SubCategory Create',
    component: () => import('../pages/SubCategory/SubCategoryCreate.vue' as any), // lazy-loaded for fast response time
  },
  {
    path: '/group-read/:id',
    name: 'Group Read',
    component: () => import('../pages/Group/GroupRead.vue' as any), // lazy-loaded for fast response time
  },
  {
    path: '/group-edit',
    name: 'Group Edit',
    component: () => import('../pages/Group/GroupEdit.vue' as any), // lazy-loaded for fast response time
  },
  {
    path: '/group-create',
    name: 'Group Create',
    component: () => import('../pages/Group/GroupCreate.vue' as any), // lazy-loaded for fast response time
  },
  {
    path: '/universal-stats',
    name: 'UniversalStatistics',
    component: () => import('../pages/UniversalStats.vue' as any), // lazy-loaded for fast response time
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log('Navigating to:', to.fullPath); // The new route
  console.log('Coming from:', from.fullPath); // The current route
  // Perform actions before loading the route (e.g., fetching data)
  next(); // Always call next() to proceed with navigation
});

export default router;