export default [{
    path: '/',
    name: 'Operation',
    component(r) {
      require.ensure([], (require) => {
        r(require('@/pages/Initial'))
      })
    }
  },
  {
    path: 'Article',
    name: 'Article',
    component(r) {
      require.ensure([], (require) => {
        r(require('@/pages/Operation/Article/Article'))
      })
    },
    children: [{
        path: 'ArticleList',
        name: 'ArticleList',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Operation/Article/ArticleList'))
          })
        }
      },
      {
        path: 'CreateArticle',
        name: 'CreateArticle',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Operation/Article/CreateArticle'))
          })
        }
      },
      {
        path: 'ModifyArticle',
        name: 'ModifyArticle',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Operation/Article/ModifyArticle'))
          })
        }
      },
      {
        path: 'IssueList',
        name: 'IssueList',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Operation/Article/IssueList'))
          })
        }
      }
    ]
  }
]
