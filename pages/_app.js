import '../styles/globals.css';
import React, { useContext, useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import Layout from '../components/layout';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { useRouter } from 'next/router';
import { MetaMaskProvider } from 'metamask-react';
import UserContext from '../components/UserContext';
import { useRef } from 'react';
import { MoralisProvider } from "react-moralis";
import { QueryClient, QueryClientProvider } from 'react-query';
import MoralisV1 from "moralis-v1";
import ErrorPage from './_error';
import Error_page from './404'

const queryClient = new QueryClient();

const id = '001';
const server = 'https://server-production-42cf.up.railway.app';

MoralisV1.initialize(id, `${server}/server`);
MoralisV1.serverURL = `${server}/server`;

function MyApp({ Component, pageProps, err }) {

	const router = useRouter();
	const pid = router.asPath;
	const scrollRef = useRef({
		scrollPos: 0,
	});

	return (
		<>
			<MoralisProvider appId={id} serverUrl={`${server}/server`}>
				<QueryClientProvider client={queryClient} >
					<Provider store={store}>
						<ThemeProvider enableSystem={true} defaultTheme={'dark'} attribute="class">
							<MetaMaskProvider>
								<UserContext.Provider value={{ scrollRef: scrollRef }}>
									{pid === '/login' ? (
										<Component {...pageProps} />
									) : (
										<Layout>
											<Component {...pageProps} />
										</Layout>
									)}
								</UserContext.Provider>
							</MetaMaskProvider>
						</ThemeProvider>
					</Provider>
				</QueryClientProvider>
			</MoralisProvider>
		</>
	);
}

export default MyApp;
