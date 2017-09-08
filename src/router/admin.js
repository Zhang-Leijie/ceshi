export default [{
    path: '/',
    name: 'Admin',
    component(r) {
      require.ensure([], (require) => {
        r(require('@/pages/Initial'))
      }, 'admin')
    }
  },

  {
    path: 'PlatAdmin',
    name: 'PlatAdmin',
    component(r) {
      require.ensure([], (require) => {
        r(require('@/pages/Admin/PlatAdmin/PlatAdmin'))
      }, 'admin')
    },
  },


  {
    path: 'UserAdmin',
    name: 'UserAdmin',
    component(r) {
      require.ensure([], (require) => {
        r(require('@/pages/Admin/UserAdmin/UserAdmin'))
      }, 'admin')
    },
    children: [{
        path: 'UserList',
        name: 'UserList',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Admin/UserAdmin/List/UserList'))
          }, 'admin')
        },
      },
      {
        path: 'BlackList',
        name: 'BlackList',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Admin/UserAdmin/List/BlackList'))
          }, 'admin')
        },
      },
      {
        path: 'DeleteList',
        name: 'DeleteList',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Admin/UserAdmin/List/DeleteList'))
          }, 'admin')
        },
      }
    ]
  },

  {
    path: 'LawyerAdmin',
    name: 'LawyerAdmin',
    component(r) {
      require.ensure([], (require) => {
        r(require('@/pages/Admin/LawyerAdmin/LawyerAdmin'))
      }, 'admin')
    },
    children: [{
        path: 'LawyerList',
        name: 'LawyerList',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Admin/LawyerAdmin/List/LawyerList'))
          }, 'admin')
        }
      },
      {
        path: 'LawyerBlackList',
        name: 'LawyerBlackList',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Admin/LawyerAdmin/List/LawyerBlackList'))
          }, 'admin')
        }
      },
      {
        path: 'LawyerDeletelist',
        name: 'LawyerDeleteList',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Admin/LawyerAdmin/List/LawyerDeleteList'))
          }, 'admin')
        }
      },
      {
        path: 'LawyerCreate',
        name: 'LawyerCreate',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Admin/LawyerAdmin/LawyerCreate'))
          }, 'admin')
        }
      },
      {
        path: 'LawyerModify',
        name: 'LawyerModify',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Admin/LawyerAdmin/LawyerModify'))
          }, 'admin')
        }
      }
    ]
  }
]
