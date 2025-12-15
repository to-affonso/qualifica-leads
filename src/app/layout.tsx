import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Qualifica Leads",
  description: "Customer service tool for lead qualification",
};

const antdTheme = {
  token: {
    colorPrimary: "#f56738",
    colorInfo: "#f56738",
    colorSuccess: "#20a483",
    colorWarning: "#faa600",
    colorError: "#ce4242",
    colorLink: "#387ba8",
    colorTextBase: "#121619",
    borderRadius: 4,
    fontFamily: "var(--font-inter)",
  },
  components: {
    Tabs: {
      horizontalMargin: '0 24px 0 0',
      horizontalItemGutter: 24,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased font-inter`}
      >
        <AntdRegistry>
          <ConfigProvider theme={antdTheme}>
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
