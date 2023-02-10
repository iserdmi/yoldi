import Head from 'next/head'

export const Meta = ({ title }: { title?: string }) => (
  <Head>
    <title>{title ? `${title} — Yoldi` : 'Yoldi'}</title>
  </Head>
)
