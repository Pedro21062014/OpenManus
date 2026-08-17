import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'OpenManus - Agente Autônomo Open Source & E2B Sandbox',
  description: 'Agente autônomo open source com sandbox de execução E2B, múltiplos modelos de IA customizáveis pelo usuário, navegador interativo e biblioteca de artefatos.',
  openGraph: {
    title: 'OpenManus - Agente Autônomo Open Source & E2B Sandbox',
    description: 'Agente autônomo open source com sandbox de execução E2B, múltiplos modelos de IA e biblioteca de artefatos.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenManus Open Source',
    description: 'Agente autônomo open source com sandbox E2B e múltiplos modelos de IA.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
