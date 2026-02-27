import { ResolveFn } from '@angular/router';
import { PostsService } from './posts.service';
import { inject } from '@angular/core';
import { first, map, mergeMap, of, take, tap } from 'rxjs';

export const postsResolver: ResolveFn<boolean> = (route, state) => {
  const postsService = inject(PostsService);

  return postsService.loaded$.pipe(
    tap((loaded) => {
      if (!loaded) {
        postsService.getAll();
      }
    }),
    first(),
  );
};
