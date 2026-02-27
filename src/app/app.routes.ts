import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home').then((c) => c.Home) },
  {
    path: 'posts',
    loadComponent: () => import('./posts/posts-list/posts-list').then((c) => c.PostsList),
  },
  {
    path: 'posts/add',
    loadComponent: () => import('./posts/add-post/add-post').then((c) => c.AddPost),
  },
  {
    path: 'posts/edit/:id',
    loadComponent: () => import('./posts/edit-post/edit-post').then((c) => c.EditPost),
  },
  {
    path: 'posts/details/:id',
    loadComponent: () => import('./posts/single-post/single-post').then((c) => c.SinglePost),
  },
];
