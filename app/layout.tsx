import './global.css'
import 'antd/dist/reset.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import {ConfigProvider, ThemeConfig} from 'antd';  // ConfigProvider 추가
import { Metadata } from "next"
import Header from './(layouts)/header'
import styles from './layout.module.css'

export const metadata: Metadata = {
  title: {
    template: "4Q | %s",
    default: "4Q",
  },
  description: '포토 큐알 자동 생성 서비스',
    icons: {
        icon: "/favicon.png",
    },
}

const config: ThemeConfig = {
    token: {
        colorPrimary: '#FF5B0F',

    },
};


export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <body className={styles.container}>
      <AntdRegistry>
          <ConfigProvider
              theme={config}
          >
        <Header />
        <div className={styles.bodyContainer}>

          {children}
        </div>
          </ConfigProvider>
      </AntdRegistry>
      </body>
      </html>
  )
}

