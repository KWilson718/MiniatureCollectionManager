import { createRouter, createWebHashHistory } from 'vue-router';
import CategoryList from '../pages/Category/CategoryList.vue';

const routes = [
  {
    path: '/',
    name: 'Category List',
    component: CategoryList,
  },
  {
    path: '/category-read',
    name: 'Category Read',
    component: () => import('../pages/Category/CategoryRead.vue'), // lazy-loaded for fast response time
  },
  {
    path: '/category-edit',
    name: 'Category Edit',
    component: () => import('../pages/Category/CategoryEdit.vue'), // lazy-loaded for fast response time
  },
  {
    path: '/category-create',
    name: 'Category Create',
    component: () => import('../pages/Category/CategoryCreate.vue'), // lazy-loaded for fast response time
  },
  {
    path: '/item-read',
    name: 'Item Read',
    component: () => import('../pages/Item/ItemRead.vue'), // lazy-loaded for fast response time
  },
  {
    path: '/item-edit',
    name: 'Item Edit',
    component: () => import('../pages/Item/ItemEdit.vue'), // lazy-loaded for fast response time
  },
  {
    path: '/item-create',
    name: 'Item Create',
    component: () => import('../pages/Item/ItemCreate.vue'), // lazy-loaded for fast response time
  },
  {
    path: '/subcategory-read',
    name: 'SubCategory Read',
    component: () => import('../pages/SubCategory/SubCategoryRead.vue'), // lazy-loaded for fast response time
  },
  {
    path: '/subcategory-edit',
    name: 'SubCategory Edit',
    component: () => import('../pages/SubCategory/SubCategoryEdit.vue'), // lazy-loaded for fast response time
  },
  {
    path: '/subcategory-create',
    name: 'SubCategory Create',
    component: () => import('../pages/SubCategory/SubCategoryCreate.vue'), // lazy-loaded for fast response time
  },
  {
    path: '/universal-stats',
    name: 'UniversalStatistics',
    component: () => import('../pages/UniversalStats.vue'), // lazy-loaded for fast response time
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;