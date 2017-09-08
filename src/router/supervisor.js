export default [{
        path: '/',
        name: 'Supervisor',
        component(r) {
            require.ensure([], (require) => {
                r(require('@/pages/Initial'))
            }, 'supervisor')
        }
    },

    {
        path: 'Order',
        name: 'Order',
        component(r) {
            require.ensure([], (require) => {
                r(require('@/pages/Supervisor/Order/Order'))
            }, 'supervisor')
        },
        children: [{
                path: 'Apply',
                name: 'Apply',
                component(r) {
                    require.ensure([], (require) => {
                        r(require('@/pages/Supervisor/Order/OrderList'))
                    }, 'supervisor')
                }
            },
            {
                path: 'Detail/:id',
                name: 'OrderDetail',
                component(r) {
                    require.ensure([], (require) => {
                        r(require('@/pages/Supervisor/Order/OrderDetail'))
                    }, 'supervisor')
                }
            },
            {
                path: 'pushList',
                name: 'OrderPushList',
                component(r) {
                    require.ensure([], (require) => {
                        r(require('@/pages/Supervisor/Order/PushList'))
                    }, 'supervisor')
                }
            },
            {
                path: 'Schedule',
                name: 'OrderSchedule',
                component(r) {
                    require.ensure([], (require) => {
                        r(require('@/pages/Supervisor/Order/OrderSchedule'))
                    }, 'supervisor')
                }
            },
            {
                path: 'CancelList',
                name: 'OrderCancelList',
                component(r) {
                    require.ensure([], (require) => {
                        r(require('@/pages/Supervisor/Order/CancelList'))
                    }, 'supervisor')
                }
            }
        ]
    },

    {
        path: 'Lawyers',
        name: 'SupLawyers',
        component(r) {
            require.ensure([], (require) => {
                r(require('@/pages/Supervisor/Lawyers/Lawyers'))
            }, 'supervisor')
        }
    }
]