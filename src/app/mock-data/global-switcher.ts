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
        icon: 'check',
        message: 'Active',
      },
    },
    {
      id: 'staging',
      url: '/environments/staging',
      name: 'Staging',
      status: {
        state: 'positive',
        icon: 'check',
        message: 'Active',
      },
    },
    {
      id: 'development',
      url: '/environments/development',
      name: 'Development',
      status: {
        state: 'positive',
        icon: 'check',
        message: 'Active',
      },
    },
  ];