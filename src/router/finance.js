export default [{
    path: '/',
    name: 'Finance',
    component(r) {
      require.ensure([], (require) => {
        r(require('@/pages/Initial'))
      }, 'finance')
    }
  },
  {
    path: 'Govern',
    name: 'Govern',
    component(r) {
      require.ensure([], (require) => {
        r(require('@/pages/Finance/Govern/Govern'))
      }, 'finance')
    },
    children: [{
        path: 'DepositList',
        name: 'GovernDepositList',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Finance/Govern/List/DepositList'))
          }, 'finance')
        }
      },
      {
        path: 'RefundList',
        name: 'GovernRefundList',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Finance/Govern/List/RefundList'))
          }, 'finance')
        }
      },
      {
        path: 'OrderList',
        name: 'GovernOrderList',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Finance/Govern/List/OrderList'))
          }, 'finance')
        }
      },
      {
        path: 'EpibolyList',
        name: 'GovernEpibolyList',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Finance/Govern/List/EpibolyList'))
          }, 'finance')
        }
      }
    ]
  },
  {
    path: 'Epiboly',
    name: 'Epiboly',
    component(r) {
      require.ensure([], (require) => {
        r(require('@/pages/Finance/Epiboly/Epiboly'))
      }, 'finance')
    },
    children: [{
        path: 'CamboList/:status',
        name: 'EpibolyCamboList',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Finance/Epiboly/List/CamboList'))
          }, 'finance')
        }
      },
      {
        path: "CamboDetail/:status",
        name: "EpibolyCamboDetail",
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Finance/Epiboly/CamboDetail'))
          }, 'finance')
        }
      },
      {
        path: "CreateCambo/:status",
        name: "EpibolyCreateCambo",
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Finance/Epiboly/CreateCambo'))
          }, 'finance')
        }
      },
      {
        path: "ModifyCambo/:status",
        name: "EpibolyModifyCambo",
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Finance/Epiboly/ModifyCambo'))
          }, 'finance')
        }
      },
      {
        path: "ManageList",
        name: "EpibolyManageList",
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Finance/Epiboly/List/ManageList'))
          }, 'finance')
        }
      }
    ]
  }
]
