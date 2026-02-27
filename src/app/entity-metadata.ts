import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Post: {
    // sortComparer: (a, b) => b.id - a.id,
    // entityDispatcherOptions: {
    //   optimisticUpdate: true,
    //   optimisticDelete: true,
    // },
  },
};

const pluralNames = {};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
