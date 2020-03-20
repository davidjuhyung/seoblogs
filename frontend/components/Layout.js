import Header from './header.component';
const Layout = ({ children }) => (
	<React.Fragment>
		<Header />
		{children}
		<p>Footer</p>
	</React.Fragment>
);

export default Layout;
