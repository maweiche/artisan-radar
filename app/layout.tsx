import './global.css';
import { UiLayout } from '@/components/ui/ui-layout';
import { ClusterProvider } from '@/components/cluster/cluster-data-access';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { ReactQueryProvider } from './react-query-provider';
import ApolloWrapper from "@/components/apollo/apollo-provider";
import { AuthProvider } from '@/components/apollo/auth-context-provider';
import ThemeProvider from '@/hooks/use-theme';
import fontVariables from '@/utils/fonts';

export const metadata = {
  title: 'artsn-ui',
  description: 'Generated by create-solana-dapp',
};

const links: { label: string; path: string }[] = [
  { label: 'Account', path: '/account' },
  { label: 'Clusters', path: '/clusters' },
  { label: 'Counter Program', path: '/counter' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400..800&display=swap" rel="stylesheet"></link>
      </head>
      <body className={`${fontVariables} bg-bg`}>
        <ReactQueryProvider>
          <ApolloWrapper>
            <AuthProvider>
              <ClusterProvider>
                <SolanaProvider>
                  <ThemeProvider>
                    <UiLayout links={links}>{children}</UiLayout>
                  </ThemeProvider>
                </SolanaProvider>
              </ClusterProvider>
            </AuthProvider>
          </ApolloWrapper>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
