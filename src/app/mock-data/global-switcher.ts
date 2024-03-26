export interface GlobalSwitcherItem {
    id: string;
    url: string;
    name: string;
    description?: string;
    status?: {
      state: string;
      icon: string;
      message: string;
    };
  }
  
  export const globalSwitcherItems: GlobalSwitcherItem[] = [
    {
      id: 'org',
      url: '/',
      name: 'ACME',
      description: 'Organization',
    },
    {
      id: 'production',
      url: '/environments/production',
      name: 'Production',
      status: {
        state: 'positive',
        icon: 'electric_bolt',
        message: 'Active',
      },
    },
    {
      id: 'staging',
      url: '/environments/staging',
      name: 'Staging',
      status: {
        state: 'positive',
        icon: 'electric_bolt',
        message: 'Active',
      },
    },
    {
      id: 'development',
      url: '/environments/development',
      name: 'Development',
      status: {
        state: 'negative',
        icon: 'do_not_disturb_on',
        message: 'Unavailable',
      },
    },
  ];