import Vue from 'vue'
import Router from 'vue-router'
import customer from './customer'
import supervisor from './supervisor'
import admin from './admin'
import finance from './finance'
import operation from './operation'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Login',
      component(r) {
        require.ensure([], (require) => {
          r(require('@/pages/Login'))
        })
      }
    },
    {
      path: '/AdminLogin',
      name: 'AdminLogin',
      component(r) {
        require.ensure([], (require) => {
          r(require('@/pages/AdminLogin'))
        })
      }
    },
    {
      path: '/FinanceLogin',
      name: 'FinanceLogin',
      component(resolve) {
        require(['../pages/FinanceLogin.vue'], resolve)
      }
    },
    {
      path: '/OperationLogin',
      name: 'OperationLogin',
      component(resolve) {
        require(['../pages/OperationLogin.vue'], resolve)
      }
    },
    {
      // path: '/:typeId/',
      path: '/Main/',
      component(r) {
        require.ensure([], (require) => {
          r(require('@/pages/Main'))
        })
      },
      children: [{
          path: 'Customer',
          component(r) {
            require.ensure([], (require) => {
              r(require('@/pages/Customer/Index'))
            }, 'customer')
          },
          children: customer
        },
        {
          path: 'Supervisor',
          component(r) {
            require.ensure([], (require) => {
              r(require('@/pages/Supervisor/Index'))
            })
          },
          children: supervisor
        },
        {
          path: 'Admin',
          component(r) {
            require.ensure([], (require) => {
              r(require('@/pages/Admin/Index'))
            }, 'admin')
          },
          children: admin
        },
        {
          path: 'Finance',
          component(r) {
            require.ensure([], (require) => {
              r(require('@/pages/Finance/Index'))
            }, 'admin')
          },
          children: finance
        },
        {
          path: 'Operation',
          component(r) {
            require.ensure([], (require) => {
              r(require('@/pages/Operation/Index'))
            }, 'admin')
          },
          children: operation
        }
      ]
    }
  ]
})
