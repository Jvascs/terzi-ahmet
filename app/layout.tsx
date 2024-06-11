import ProviderComponent from '@/components/layouts/provider-component';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/tailwind.css';
import { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { ClerkProvider, SignInButton, SignOutButton } from '@clerk/nextjs';

export const metadata: Metadata = {
    title: {
        template: '%s | VRISTO - Multipurpose Tailwind Dashboard Template',
        default: 'VRISTO - Multipurpose Tailwind Dashboard Template',
    },
};
const nunito = Nunito({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-nunito',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
          
         <html lang="en">
            <body className={nunito.variable}>
            <SignOutButton/>
            <SignInButton/>
                <ProviderComponent>{children}</ProviderComponent>
            </body>
        </html>
        </ClerkProvider>
       
    );
}
