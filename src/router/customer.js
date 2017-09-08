export default [{
    path: '/',
    name: 'Customer',
    component(r) {
      console.log(1)
      require.ensure([], (require) => {
        r(require('@/pages/Initial'))
      }, 'customer')
    }
  },

  {
    path: 'Consultation',
    name: 'Consultation',
    component(r) {
      console.log(2)
      require.ensure([], (require) => {
        r(require('@/pages/Customer/Consultation/Consultation'))
      }, 'customer')
    },
    children: [{
        path: 'Dealing',
        name: 'ConsultationDealing',
        component(r) {
          console.log(3)
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Consultation/List/Dealing'))
          }, 'customer')
        }
      },
      {
        path: 'WaitDeal',
        name: 'ConsultationWaitDeal',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Consultation/List/WaitDeal'))
          }, 'customer')
        }
      },
      {
        path: 'FinishDeal',
        name: 'ConsultationFinishDeal',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Consultation/List/FinishDeal'))
          }, 'customer')
        }
      },
      {
        path: 'Detail',
        name: 'ConsultationDetail',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Consultation/ConsultationDetail'))
          }, 'customer')
        }
      },
      {
        path: 'CreateOrder',
        name: 'ConsultationCreateOrder',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Consultation/CreateOrder'))
          }, 'customer')
        }
      },
      {
        path: 'ToView',
        name: 'ConsultationToView',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Consultation/ConsultationToView'))
          }, 'customer')
        }
      }
    ]
  },

  {
    path: 'Guarantee',
    name: 'Guarantee',
    component(r) {
      require.ensure([], (require) => {
        r(require('@/pages/Customer/Guarantee/Guarantee'))
      }, 'customer')
    },
    children: [{
        path: 'Dealing',
        name: "GuaranteeDealing",
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Guarantee/List/Dealing'))
          }, 'customer')
        }
      },
      {
        path: 'WaitDeal',
        name: 'GuaranteeWaitDeal',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Guarantee/List/WaitDeal'))
          }, 'customer')
        }
      },
      {
        path: 'FinishDeal',
        name: 'GuaranteeFinishDeal',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Guarantee/List/FinishDeal'))
          }, 'customer')
        }
      },
      {
        path: 'Detail',
        name: 'GuaranteeDetail',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Guarantee/GuaranteeDetail'))
          }, 'customer')
        }
      },
      {
        path: 'ToView',
        name: 'GuaranteeToView',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Guarantee/GuaranteeToView'))
          }, 'customer')
        }
      }
    ]
  },

  {
    path: 'Common',
    component(r) {
      require.ensure([], (require) => {
        r(require('@/pages/Customer/common/Common'))
      }, 'customer')
    },
    children: [{
        path: '',
        name: 'Common',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/common/List/IndexList'))
          }, 'customer')
        }
      },
      {
        path: 'Select',
        name: 'CommonSelect',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/common/List/Select'))
          }, 'customer')
        }
      },
      {
        path: 'Price',
        name: 'CommonPrice',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/common/List/Price'))
          }, 'customer')
        }
      },
      {
        path: "Service",
        name: "CommonService",
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/common/List/Service'))
          }, 'customer')
        }
      },
      {
        path: "Evaluation",
        name: "CommonEvaluation",
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/common/List/Evaluation'))
          }, 'customer')
        }
      },
      {
        path: "Complete",
        name: "CommonComplete",
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/common/List/Complete'))
          }, 'customer')
        }
      },
      {
        path: "End",
        name: "CommonEnd",
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/common/List/End'))
          }, 'customer')
        }
      },
      {
        path: 'Schedule/:status',
        name: 'CommonSchedule',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/common/Commonschedule'))
          }, 'customer')
        }
      },
      {
        path: 'Detail/:status',
        name: 'CommonDetail',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/common/CommonDetail'))
          }, 'customer')
        }
      },
      {
        path: 'PushList/:status',
        name: 'CommonPushList',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/common/List/PushList'))
          }, 'customer')
        }
      },
    ]
  },

  {
    path: 'Outsourcing',
    component(r) {
      require.ensure([], (require) => {
        r(require('@/pages/Customer/Outsourcing/Outsourcing'))
      }, 'customer')
    },
    children: [{
        path: '',
        name: 'Outsourcing',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Outsourcing/List/IndexList'))
          }, 'customer')
        }
      },
      {
        path: 'Platform',
        name: 'OutsourcingPlatform',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Outsourcing/List/Platform'))
          }, 'customer')
        }
      },
      {
        path: 'OfferPrice',
        name: 'OutsourcingOfferPrice',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Outsourcing/List/OfferPrice'))
          }, 'customer')
        }
      },
      {
        path: 'Service',
        name: 'OutsourcingService',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Outsourcing/List/Service'))
          }, 'customer')
        }
      },
      {
        path: 'Evaluation',
        name: 'OutsourcingEvaluation',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Outsourcing/List/Evaluation'))
          }, 'customer')
        }
      },
      {
        path: 'Complete',
        name: 'OutsouringComplete',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Outsourcing/List/Complete'))
          }, 'customer')
        }
      },
      {
        path: 'End',
        name: 'OutsouringEnd',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Outsourcing/List/End'))
          }, 'customer')
        }
      },

      {
        path: 'AssingList/:status',
        name: 'OutsourcingAssingList',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Outsourcing/List/AssignList'))
          }, 'customer')
        }
      },
      {
        path: 'detail/:status',
        name: 'OutsourcingDetail',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Outsourcing/OutsourcingDetail'))
          }, 'customer')
        }
      },
      {
        path: 'Schedule/:status',
        name: 'OutsouringSchedule',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Outsourcing/Outsourcingschedule'))
          }, 'customer')
        }
      }
    ]
  },

  {
    path: 'Mediation',
    name: 'Mediation',
    component(r) {
      require.ensure([], (require) => {
        r(require('@/pages/Customer/Mediation/Mediation'))
      }, 'customer')
    },
    children: [{
        path: 'Dealing',
        name: 'MediationDealing',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Mediation/List/Dealing'))
          }, 'customer')
        }
      },
      {
        path: 'WaitDeal',
        name: 'MediationWaitDeal',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Mediation/List/WaitDeal'))
          }, 'customer')
        }
      },
      {
        path: 'FinishDeal',
        name: 'MediationFinishDeal',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Mediation/List/FinishDeal'))
          }, 'customer')
        }
      },
      {
        path: 'Detail/:status',
        name: 'MediationDetail',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Mediation/MediationDetail'))
          }, 'customer')
        }
      },
      {
        path: 'toView',
        name: 'MediationToView',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Mediation/MediationToView'))
          }, 'customer')
        }
      }
    ]
  },

  {
    path: 'Lawsuit',
    name: 'Lawsuit',
    component(r) {
      require.ensure([], (require) => {
        r(require('@/pages/Customer/Lawsuit/Lawsuit'))
      }, 'customer')
    },
    children: [{
        path: 'Dealing',
        name: 'LawsuitDealing',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Lawsuit/List/Dealing'))
          }, 'customer')
        }
      },
      {
        path: 'WaitDeal',
        name: 'LawsuitWaitDeal',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Lawsuit/List/WaitDeal'))
          }, 'customer')
        }
      },
      {
        path: 'FinishDeal',
        name: 'LawsuitFinishDeal',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Lawsuit/List/FinishDeal'))
          }, 'customer')
        }
      },
      {
        path: 'Detail/:status',
        name: 'LawsuitDetail',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Lawsuit/LawsuitDetail'))
          }, 'customer')
        }
      },
      {
        path: 'toView',
        name: 'LawsuitToView',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Lawsuit/LawsuitToView'))
          }, 'customer')
        }
      }
    ]
  },

  {
    path: 'Certification',
    name: 'Certification',
    component(r) {
      require.ensure([], (require) => {
        r(require('@/pages/Customer/Certification/Certification'))
      }, 'customer')
    },
    children: [{
        path: 'Dealing',
        name: 'CertificationDealing',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Certification/List/CerDealing'))
          }, 'customer')
        }
      },
      {
        path: 'WaitDeal',
        name: 'CertificationWaitDeal',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Certification/List/CerWaitDeal'))
          }, 'customer')
        }
      },
      {
        path: 'FinishDeal',
        name: 'CertificationFinishDeal',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Certification/List/CerFinishDeal'))
          }, 'customer')
        }
      },
      {
        path: 'Detail/:status',
        name: 'CertificationDetail',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Certification/CertificationDetail'))
          }, 'customer')
        }
      },
      {
        path: 'ToView',
        name: 'CertificationToView',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Certification/CertificationToView'))
          }, 'customer')
        }
      }
    ]
  },

  {
    path: 'Review',
    name: 'Review',
    component(r) {
      require.ensure([], (require) => {
        r(require('@/pages/Customer/Review/Review'))
      }, 'customer')
    },
    children: [{
        path: 'Dealing',
        name: 'ReviewDealing',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Review/List/Dealing'))
          }, 'customer')
        }
      },
      {
        path: 'WaitDeal',
        name: 'ReviewWaitDeal',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Review/List/WaitDeal'))
          }, 'customer')
        }
      },
      {
        path: 'FinishDeal',
        name: 'ReviewFinishDeal',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Review/List/FinishDeal'))
          }, 'customer')
        }
      },
      {
        path: 'Detail/:status',
        name: 'ReviewDetail',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Review/ReviewDetail'))
          }, 'customer')
        }
      },
      {
        path: 'ToView',
        name: 'ReviewToView',
        component(r) {
          require.ensure([], (require) => {
            r(require('@/pages/Customer/Review/ReviewToView'))
          }, 'customer')
        }
      }
    ]
  },

  {
    path: 'Lawyers',
    name: 'Lawyers',
    component(r) {
      require.ensure([], (require) => {
        r(require('@/pages/Customer/Lawyers/Lawyers'))
      }, 'customer')
    }
  }
]
