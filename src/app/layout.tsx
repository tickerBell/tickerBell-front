import './globals.css'
import './index.scss';
import Script from "next/script";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import RecoilRootProvider from '@/util/recoilRootProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ticket',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <head>
        {/* 아임포트 결제를 위한 script */}
        <Script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js" />
        <Script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.1.8.js" />
        {/* 카카오 로그인을 위한 script */}
        <Script src="https://t1.kakaocdn.net/kakao_js_sdk/2.4.0/kakao.min.js" integrity="sha384-mXVrIX2T/Kszp6Z0aEWaA8Nm7J6/ZeWXbL8UpGRjKwWe56Srd/iyNmWMBhcItAjH" crossOrigin="anonymous"
        />
        <Script src="https://developers.kakao.com/sdk/js/kakao.js" />
      </head>
      <body className={inter.className}>
        <RecoilRootProvider>
          {children}
        </RecoilRootProvider>
        <div id='modal' />
      </body>
    </html>
  )
}
