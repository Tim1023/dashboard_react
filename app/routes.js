// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors, checkAuth } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'merchant',
      // onEnter: (nextState, replace) => checkAuth(store, nextState, replace),
      getComponent(nextState, cb) {
        import('containers/MerchantsPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },

    },{
      path: '/login',
      name: 'login',
      // onEnter: (nextState, replace) => checkAuth(store, nextState, replace),
      getComponent(nextState, cb) {
        import('containers/LoginPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },

    },{
      path: '/app',
      name: 'app',
      // onEnter: (nextState, replace) => checkAuth(store, nextState, replace),
      getComponent(nextState, cb) {
        import('containers/Admin')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
      childRoutes: [
        {
          path: '/home',
          name: 'home',
          // onEnter: (nextState, replace) => checkAuth(store, nextState, replace),
          getComponent(nextState, cb) {
            const importModules = Promise.all([
            import('containers/HomePage/reducer'),
            import('containers/HomePage/sagas'),
            import('containers/HomePage'),

          ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('home', reducer.default);
              injectSagas(sagas.default);

              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        }, {
          path: '/features',
          name: 'features',
          // onEnter: (nextState, replace) => checkAuth(store, nextState, replace),

          getComponent(nextState, cb) {
            import('containers/FeaturePage')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        },{
          path: '/category',
          name: 'categoriesPage',
          // onEnter: (nextState, replace) => checkAuth(store, nextState, replace),
          getComponent(nextState, cb) {
            import('containers/CategoriesPage')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        },{
          path: '/addCategory',
          name: 'addCategoriesPage',
          // onEnter: (nextState, replace) => checkAuth(store, nextState, replace),
          getComponent(nextState, cb) {
            import('containers/AddCategory')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        },{
          path: '/innerProduct',
          name: 'merchantsPage',
          // onEnter: (nextState, replace) => checkAuth(store, nextState, replace),
          getComponent(nextState, cb) {
            import('containers/InnerProductsPage')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        } ,{
          path: '/listingProduct',
          name: 'merchantsPage',
          // onEnter: (nextState, replace) => checkAuth(store, nextState, replace),
          getComponent(nextState, cb) {
            import('containers/ListingProductPage')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        },{
          path: '/AddProduct',
          name: 'AddProductPage',
          onEnter: (nextState, replace) => checkAuth(store, nextState, replace),
          getComponent(nextState, cb) {
            import('containers/AddProduct')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        },{
          path: '/form',
          name: 'formsPage',
          // onEnter: (nextState, replace) => checkAuth(store, nextState, replace),
          getComponent(nextState, cb) {
            import('containers/FormPage')
              .then(loadModule(cb))
              .catch(errorLoading);
          },
        },{
          path: '/order',
          name: 'orders',
          // onEnter: (nextState, replace) => checkAuth(store, nextState, replace),
          getComponent(nextState, cb) {
            const importModules = Promise.all([
            import('containers/OrdersPage/reducer'),
            import('containers/OrdersPage/sagas'),
            import('containers/OrdersPage'),

          ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('orders', reducer.default);
              injectSagas(sagas.default);

              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
    ]
    },{
      path: 'register',
      name: 'registerPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
        import('containers/RegisterPage/reducer'),
        import('containers/RegisterPage'),
      ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('registerPage', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/addMerchant',
      name: 'addMerchant',
      // onEnter: (nextState, replace) => checkAuth(store, nextState, replace),

      getComponent(nextState, cb) {
        import('containers/AddMerchant')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
    {
      path: '/merchant',
      name: 'merchantsPage',
      // onEnter: (nextState, replace) => checkAuth(store, nextState, replace),
      getComponent(nextState, cb) {
        const importModules = Promise.all([
        import('containers/AddMerchant/reducer'),
        import('containers/AddMerchant/sagas'),
        import('containers/MerchantsPage'),

      ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('addMerchant', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
