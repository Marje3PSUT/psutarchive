export const useLinks = () => {
  type Link = {
    name: string;
    icon?: string;
    url: string;
    external?: boolean;
    logoUrl?(theme: string | null): string;
  };

  const config = useRuntimeConfig();

  const socialLinks = ref<Link[]>([
    {
      name: 'Facebook',
      icon: 'ion:logo-facebook',
      url: 'https://www.facebook.com/marje3psut',
      external: true,
    },
    {
      name: 'Instagram',
      icon: 'ion:logo-instagram',
      url: 'https://www.instagram.com/marje3.psut/',
      external: true,
    },
    {
      name: 'Discord',
      icon: 'ion:logo-discord',
      url: 'https://discord.gg/SKEuduaVEC',
      external: true,
    },
    {
      name: 'GitHub',
      icon: 'ion:logo-github',
      url: 'https://github.com/Marje3PSUT/',
      external: true,
    },
  ]);

  const siteLinks = ref<Link[]>([
    {
      name: 'courses',
      url: '/courses',
    },
    {
      name: 'submit',
      url: config.public.editorUrl,
      external: true,
    },
    {
      name: 'about',
      url: '/about',
    },
    {
      name: 'contact',
      url: '/about#contact',
    },
    {
      name: 'terms',
      url: '/about#terms',
    },
    {
      name: 'privacy',
      url: '/about#privacy',
    },
  ]);

  const sponsorLinks = ref<Link[]>([
    {
      name: 'Black Mamba',
      url: 'https://www.instagram.com/blackmamba.jo/',
      external: true,
      logoUrl(theme: 'light' | 'dark'): string {
        return theme === 'dark' ? '/sponsors/blackmamba/white.png' : '/sponsors/blackmamba/black.png';
      },
    },
  ]);

  return {
    socialLinks,
    siteLinks,
    sponsorLinks,
  };
};
