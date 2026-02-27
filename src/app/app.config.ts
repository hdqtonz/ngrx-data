import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { EntityDataService, provideEntityData, withEffects } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { PostsDataService } from './posts/posts-data.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    // ngrx-store
    provideStore(),
    provideEffects(),
    // ngrx-data
    provideEntityData(entityConfig, withEffects()),
    // DevTools
    provideStoreDevtools(),
    // App Initializer
    provideAppInitializer(() => {
      const entityDataService = inject(EntityDataService);
      const postsDataService = inject(PostsDataService);

      entityDataService.registerService('Post', postsDataService);
    }),
  ],
};
