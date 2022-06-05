import Head from 'next/head';

type Props = {
  title: string
  description: string
  icon: string
  thumbnail: string
}

const meta = {
  og: {
    description: '正在使用社交軟體的各位，',
    siteName: '22屆知足班網'
  }
};

function HeadInitalize({ title, description, icon, thumbnail } : Props) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href={`/icons/${icon}.png`} />
      <link rel="canonical" href="http://22thS11.kami.tw/" />
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta name="author" content="22thS11_Developer" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={meta.og.siteName} />
      <meta property="og:image" content={`/thumbnails/${thumbnail}`} />
      <meta property="og:description" content={`${meta.og.description}${description}`} />
    </Head>
  );
}

export default HeadInitalize;