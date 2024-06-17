import React, { ReactNode } from 'react';
import Header from './Navigation/Header';
import Footer from './Navigation/Footer';

interface LayoutProps {
	children?: ReactNode;
	isHeader?: boolean;
	isFooter?: boolean;
	site?: string;
}

const Layout = ({ children, isHeader = false, isFooter = false, site = '' }: LayoutProps) => {
	return (
		<>
			{isHeader && <Header site={site} />}
			{children}
			{isFooter && <Footer />}
		</>
	);
};

export default Layout;
