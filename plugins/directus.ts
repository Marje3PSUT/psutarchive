import { createDirectus, rest, readItem, readItems } from '@directus/sdk';
import { Schema } from 'types/schema';

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();

  const directus = createDirectus<Schema>(runtimeConfig.public.apiUrl).with(rest());

  return {
    provide: { directus, readItem, readItems },
  };
});
