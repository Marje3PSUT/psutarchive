import { createDirectus, rest, readItem, readItems } from '@directus/sdk';

export default defineNuxtPlugin(() => {
	const runtimeConfig = useRuntimeConfig()
	const directus = createDirectus(runtimeConfig.public.apiUrl).with(rest());

	return {
		provide: { directus, readItem, readItems },
	};
});