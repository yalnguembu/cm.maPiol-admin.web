export const menuItems = [
  {
    title: "Mes Propriétés",
    isHide: true,
    icon: "et:layers",
    link: "owner/properties",
  },
  {
    title: "Users",
    icon: "heroicons:user-group",
    link: "#",
    isHide: true,
    child: [
      {
        childtitle: "Locataires ",
        childlink: "proforma",
      },
      {
        childtitle: "Visiteurs",
        childlink: "bon_att_payement",
      },
    ],
  },
  {
    title: "Contrats",
    icon: "heroicons:square-2-stack",
    link: "#",
    isHide: true,
    child: [
      {
        childtitle: "En attente",
        childlink: "owner/contracts/pending",
      },
      {
        childtitle: "En cours de validation",
        childlink: "bon_refuse",
      },
      {
        childtitle: "Validé",
        childlink: "bon_livre",
      },
      {
        childtitle: "Expiré",
        childlink: "bon_livre",
      },
    ],
  },
  {
    title: "messagerie",
    isHide: true,
    icon: "heroicons-outline:chat",
    link: "chat",
  },
  {
    title: "annonce",
    isHide: true,
    icon: "heroicons-outline:view-boards",
    link: "annonce",
  },
];

export const visitorMenus = [
  {
    title: "Propriétés",
    isHide: true,
    icon: "et:layers",
    link: "/properties",
  },
  {
    title: "Contrats",
    icon: "heroicons:square-2-stack",
    link: "#",
    isHide: true,
    child: [
      {
        childtitle: "En attente",
        childlink: "/contracts/pending",
      },
    ],
  },
  {
    title: "messagerie",
    isHide: true,
    icon: "heroicons-outline:chat",
    link: "chat",
  },
  {
    title: "annonce",
    isHide: true,
    icon: "heroicons-outline:view-boards",
    link: "annonce",
  },
];

export const tenantMenus = [
  {
    title: "Propriétés",
    isHide: true,
    icon: "et:layers",
    link: "tenant/properties",
  },
  {
    title: "Mes contrats",
    icon: "heroicons:square-2-stack",
    link: "#",
    isHide: true,
    child: [
      {
        childtitle: "En attente",
        childlink: "owner/contracts/pending",
      },
      {
        childtitle: "En cours de validation",
        childlink: "bon_refuse",
      },
      {
        childtitle: "Validé",
        childlink: "bon_livre",
      },
      {
        childtitle: "Expiré",
        childlink: "bon_livre",
      },
    ],
  },
  {
    title: "Agenda",
    isHide: true,
    icon: "heroicons-outline:calendar",
    link: "tenant/calendars",
  },
  {
    title: "messagerie",
    isHide: true,
    icon: "heroicons-outline:chat",
    link: "tenant/chat",
  },
  {
    title: "annonce",
    isHide: true,
    icon: "heroicons-outline:view-boards",
    link: "tenant/annonce",
  },
];

export const ownerMenus = [
  {
    title: "Mes Propriétés",
    isHide: true,
    icon: "et:layers",
    link: "owner/properties",
  },
  {
    title: "Contrats",
    icon: "heroicons:square-2-stack",
    link: "#",
    isHide: true,
    child: [
      {
        childtitle: "En attente",
        childlink: "owner/contracts/pending",
      },
      {
        childtitle: "En cours de validation",
        childlink: "bon_refuse",
      },
      {
        childtitle: "Validé",
        childlink: "bon_livre",
      },
      {
        childtitle: "Expiré",
        childlink: "bon_livre",
      },
    ],
  },
  {
    title: "Agenda",
    isHide: true,
    icon: "heroicons-outline:calendar",
    link: "owner/calendars",
  },
  {
    title: "messagerie",
    isHide: true,
    icon: "heroicons-outline:chat",
    link: "owner/chat",
  },
  {
    title: "annonce",
    isHide: true,
    icon: "heroicons-outline:view-boards",
    link: "owner/annonce",
  },
];

export const adminMenus = [
  {
    title: "Propriétés",
    isHide: true,
    icon: "et:layers",
    link: "admin/properties",
  },
  {
    title: "Users",
    icon: "heroicons:user-group",
    link: "#",
    isHide: true,
    child: [
      {
        childtitle: "Locataires ",
        childlink: "/admin/users/tenants",
      },
      {
        childtitle: "Visiteurs",
        childlink: "/admin/users/visitors",
      },
      {
        childtitle: "Proprietaires",
        childlink: "/admin/users/owners",
      },
    ],
  },
  {
    title: "Contrats",
    icon: "heroicons:square-2-stack",
    link: "#",
    isHide: true,
    child: [
      {
        childtitle: "En attente",
        childlink: "owner/contracts/pending",
      },
      {
        childtitle: "En cours de validation",
        childlink: "bon_refuse",
      },
      {
        childtitle: "Validé",
        childlink: "bon_livre",
      },
      {
        childtitle: "Expiré",
        childlink: "bon_livre",
      },
    ],
  },
  {
    title: "Agenda",
    isHide: true,
    icon: "heroicons-outline:calendar",
    link: "admin/calendars",
  },
  {
    title: "messagerie",
    isHide: true,
    icon: "heroicons-outline:chat",
    link: "admin/chat",
  },
  {
    title: "annonce",
    isHide: true,
    icon: "heroicons-outline:view-boards",
    link: "admin/annonce",
  },
];

export const topMenu = [
  {
    title: "Dashboard",
    icon: "heroicons-outline:home",
    link: "/app/home",
    child: [
      {
        childtitle: "Analytics Dashboard",
        childlink: "dashboard",
        childicon: "heroicons:presentation-chart-line",
      },
      {
        childtitle: "Ecommerce Dashboard",
        childlink: "ecommerce",
        childicon: "heroicons:shopping-cart",
      },
      {
        childtitle: "Project  Dashboard",
        childlink: "project",
        childicon: "heroicons:briefcase",
      },
      {
        childtitle: "CRM Dashboard",
        childlink: "crm",
        childicon: "ri:customer-service-2-fill",
      },
      {
        childtitle: "Banking Dashboard",
        childlink: "banking",
        childicon: "heroicons:wrench-screwdriver",
      },
    ],
  },
  {
    title: "App",
    icon: "heroicons-outline:chip",
    link: "/app/home",
    child: [
      {
        childtitle: "Calendar",
        childlink: "calender",
        childicon: "heroicons-outline:calendar",
      },
      {
        childtitle: "Kanban",
        childlink: "kanban",
        childicon: "heroicons-outline:view-boards",
      },
      {
        childtitle: "Todo",
        childlink: "todo",
        childicon: "heroicons-outline:clipboard-check",
      },
      {
        childtitle: "Projects",
        childlink: "projects",
        childicon: "heroicons-outline:document",
      },
    ],
  },
  {
    title: "Pages",
    icon: "heroicons-outline:view-boards",
    link: "/app/home",
    megamenu: [
      {
        megamenutitle: "Authentication",
        megamenuicon: "heroicons-outline:user",
        singleMegamenu: [
          {
            m_childtitle: "Signin One",
            m_childlink: "/",
          },
          {
            m_childtitle: "Signin Two",
            m_childlink: "/login2",
          },
          {
            m_childtitle: "Signin Three",
            m_childlink: "/login3",
          },
          {
            m_childtitle: "Signup One",
            m_childlink: "/register",
          },
          {
            m_childtitle: "Signup Two",
            m_childlink: "/register/register2",
          },
          {
            m_childtitle: "Signup Three",
            m_childlink: "/register/register3",
          },
          {
            m_childtitle: "Forget Password One",
            m_childlink: "/forgot-password",
          },
          {
            m_childtitle: "Forget Password Two",
            m_childlink: "/forgot-password2",
          },
          {
            m_childtitle: "Forget Password Three",
            m_childlink: "/forgot-password3",
          },
          {
            m_childtitle: "Lock Screen One",
            m_childlink: "/lock-screen",
          },
          {
            m_childtitle: "Lock Screen Two",
            m_childlink: "/lock-screen2",
          },
          {
            m_childtitle: "Lock Screen Three",
            m_childlink: "/lock-screen3",
          },
        ],
      },

      {
        megamenutitle: "Components",
        megamenuicon: "heroicons-outline:user",
        singleMegamenu: [
          {
            m_childtitle: "typography",
            m_childlink: "typography",
          },
          {
            m_childtitle: "colors",
            m_childlink: "colors",
          },
          {
            m_childtitle: "alert",
            m_childlink: "alert",
          },
          {
            m_childtitle: "button",
            m_childlink: "button",
          },
          {
            m_childtitle: "card",
            m_childlink: "card",
          },
          {
            m_childtitle: "carousel",
            m_childlink: "carousel",
          },
          {
            m_childtitle: "dropdown",
            m_childlink: "dropdown",
          },
          {
            m_childtitle: "image",
            m_childlink: "image",
          },
          {
            m_childtitle: "modal",
            m_childlink: "modal",
          },
          {
            m_childtitle: "Progress bar",
            m_childlink: "progress-bar",
          },
          {
            m_childtitle: "Placeholder",
            m_childlink: "placeholder",
          },

          {
            m_childtitle: "Tab & Accordion",
            m_childlink: "tab-accordion",
          },
        ],
      },
      {
        megamenutitle: "Forms",
        megamenuicon: "heroicons-outline:user",
        singleMegamenu: [
          {
            m_childtitle: "Input",
            m_childlink: "input",
          },
          {
            m_childtitle: "Input group",
            m_childlink: "input-group",
          },
          {
            m_childtitle: "Input layout",
            m_childlink: "input-layout",
          },
          {
            m_childtitle: "Form validation",
            m_childlink: "form-validation",
          },
          {
            m_childtitle: "Wizard",
            m_childlink: "form-wizard",
          },
          {
            m_childtitle: "Input mask",
            m_childlink: "input-mask",
          },
          {
            m_childtitle: "File input",
            m_childlink: "file-input",
          },
          {
            m_childtitle: "Form repeater",
            m_childlink: "form-repeater",
          },
          {
            m_childtitle: "Textarea",
            m_childlink: "textarea",
          },
          {
            m_childtitle: "Checkbox",
            m_childlink: "checkbox",
          },
          {
            m_childtitle: "Radio button",
            m_childlink: "radio-button",
          },
          {
            m_childtitle: "Switch",
            m_childlink: "switch",
          },
        ],
      },
      {
        megamenutitle: "Utility",
        megamenuicon: "heroicons-outline:user",
        singleMegamenu: [
          {
            m_childtitle: "Invoice",
            m_childlink: "invoice",
          },
          {
            m_childtitle: "Pricing",
            m_childlink: "pricing",
          },

          // {
          //   m_childtitle: "Testimonial",
          //   m_childlink: "testimonial",
          // },
          {
            m_childtitle: "FAQ",
            m_childlink: "faq",
          },
          {
            m_childtitle: "Blank page",
            m_childlink: "blank-page",
          },
          {
            m_childtitle: "Blog",
            m_childlink: "blog",
          },
          {
            m_childtitle: "404 page",
            m_childlink: "/404",
          },
          {
            m_childtitle: "Coming Soon",
            m_childlink: "/coming-soon",
          },
          {
            m_childtitle: "Under Maintanance page",
            m_childlink: "/under-construction",
          },
        ],
      },
    ],
  },

  {
    title: "Widgets",
    icon: "heroicons-outline:view-grid-add",
    link: "form-elements",
    child: [
      {
        childtitle: "Basic",
        childlink: "basic",
        childicon: "heroicons-outline:document-text",
      },
      {
        childtitle: "Statistic",
        childlink: "statistic",
        childicon: "heroicons-outline:document-text",
      },
    ],
  },

  {
    title: "Extra",
    icon: "heroicons-outline:template",

    child: [
      {
        childtitle: "Basic Table",
        childlink: "table-basic",
        childicon: "heroicons-outline:table",
      },
      {
        childtitle: "Advanced table",
        childlink: "table-advanced",
        childicon: "heroicons-outline:table",
      },
      {
        childtitle: "Apex chart",
        childlink: "appex-chart",
        childicon: "heroicons-outline:chart-bar",
      },
      {
        childtitle: "Chart js",
        childlink: "chartjs",
        childicon: "heroicons-outline:chart-bar",
      },
      {
        childtitle: "Map",
        childlink: "map",
        childicon: "heroicons-outline:map",
      },
    ],
  },
];
export const homePages = [
  "/",
  "/properties",
  "/tenant/properties",
  "/owner/properties",
  "/admin/dashbord",
  "/",
];