//config.ts

enum LayoutType {
  MIX = 'mix',
  TOP = 'top',
  SIDE = 'side',
}

const CONFIG = {
  appName: 'Gốm bát tràng',
  helpLink: 'https://github.com/lambro2510/salepage-fontend.git',
  enablePWA: true,
  theme: {
    accentColor: '#6B7280',
    secondaryColor: '#9BA2AE',
    baseBgColor: '#FFFFFF',
    cardBgColor: '#F5F5F7',
    mark: '#745FA8',
    sidebarLayout: LayoutType.TOP,
    showBreadcrumb: true,
  },
  metaTags: {
    title: 'Salepage Cms',
    description:
      'An out-of-box UI solution for enterprise applications as a React boilerplate.',
    imageURL: 'logo.svg',
  },
};

export default CONFIG;
