import { createRouter, createWebHashHistory } from 'vue-router';
import CategoryList from '../pages/Category/CategoryList.vue';

const routes = [
  {
    path: '/',
    name: 'Category List',
    component: CategoryList,
  },
  {
    path: '/category-read/:id',
    name: 'Category Read',
    component: () => import('../pages/Category/CategoryRead.vue'), // lazy-loaded for fast response time
  },
  {
    path: '/category-edit/:id',
    name: 'Category Edit',
    component: () => import('../pages/Category/CategoryEdit.vue'), // lazy-loaded for fast response time
  },
  {
    path: '/category-create/:id',
    name: 'Category Create',
    component: () => import('../pages/Category/CategoryCreate.vue'), // lazy-loaded for fast response time
  },
  {
    path: '/item-read/:id',
    name: 'Item Read',
    component: () => import('../pages/Item/ItemRead.vue'), // lazy-loaded for fast response time
  },
  {
    path: '/item-edit/:id',
    name: 'Item Edit',
    component: () => import('../pages/Item/ItemEdit.vue'), // lazy-loaded for fast response time
  },
  {
    path: '/item-create/:id',
    name: 'Item Create',
    component: () => import('../pages/Item/ItemCreate.vue'), // lazy-loaded for fast response time
  },
  {
    path: '/subcategory-read/:id',
    name: 'SubCategory Read',
    component: () => import('../pages/SubCategory/SubCategoryRead.vue'), // lazy-loaded for fast response time
  },
  {
    path: '/subcategory-edit/:id',
    name: 'SubCategory Edit',
    component: () => import('../pages/SubCategory/SubCategoryEdit.vue'), // lazy-loaded for fast response time
  },
  {
    path: '/subcategory-create/:id',
    name: 'SubCategory Create',
    component: () => import('../pages/SubCategory/SubCategoryCreate.vue'), // lazy-loaded for fast response time
  },
  {
    path: '/group-read/:id',
    name: 'Group Read',
    component: () => import('../pages/Group/GroupRead.vue'), // lazy-loaded for fast response time
  },
  {
    path: '/group-edit',
    name: 'Group Edit',
    component: () => import('../pages/Group/GroupEdit.vue'), // lazy-loaded for fast response time
  },
  {
    path: '/group-create',
    name: 'Group Create',
    component: () => import('../pages/Group/GroupCreate.vue'), // lazy-loaded for fast response time
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