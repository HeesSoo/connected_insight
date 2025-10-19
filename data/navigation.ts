import { NavigationConfig } from "@/types/navigation";

export const navigationConfig: NavigationConfig = {
  items: [
    {
      id: "solutions",
      label: "Solutions",
      href: "/solutions",
    },
    {
      id: "products",
      label: "Products",
      // href: "javascript:void(0)",
      hasDropdown: true,
      children: [
        {
          id: "cis-camera",
          label: "CIS Camera",
          href: "/product",
        },
        {
          id: "lingchen",
          label: "Industril Control Devices",
          // href: "/product?tab=lingchen",
          hasDropdown: true,
          external: [
            {
              id: "lingchen-ipc",
              label: "IPC",
              href: "https://www.naver.com",
            },
            {
              id: "lingchen-ethercat",
              label: "EtherCAT Motion & IO CARD",
              href: "https://www.naver.com",
            },
            {
              id: "lingchen-plc",
              label: "PLC Controlling System",
              href: "https://www.naver.com",
            },
            {
              id: "lingchen-io",
              label: "IO Module Series",
              href: "https://www.naver.com",
            },
          ],
        },
        {
          id: "tokk",
          label: "Linear Actuator",
          // href: "/product?tab=tokk",
          hasDropdown: true,
          external: [
            {
              id: "tokk-kk",
              label: "KK series",
              href: "https://www.naver.com",
              isExternal: true,
            },
            {
              id: "tokk-leth",
              label: "LETH series",
              href: "https://www.naver.com",
              isExternal: true,
            },
            {
              id: "tokk-loth",
              label: "LOTH series",
              href: "https://www.naver.com",
              isExternal: true,
            },
            {
              id: "tokk-platform",
              label: "High precision positioning platform",
              href: "https://www.naver.com",
              isExternal: true,
            },
            {
              id: "tokk-table",
              label: "High Precision Electric Side Table",
              href: "https://www.naver.com",
              isExternal: true,
            },
          ],
        },
      ],
    },
    {
      id: "support",
      label: "Support",
      // href: "javascript:void(0)",
      hasDropdown: true,
      children: [
        {
          id: "reservation-lab",
          label: "Reservation Lab",
          href: "/support",
        },
        {
          id: "downloads",
          label: "Downloads",
          href: "/support/download",
        },
      ],
    },
    {
      id: "contact",
      label: "Contact",
      href: "/contact",
    },
  ],
};
