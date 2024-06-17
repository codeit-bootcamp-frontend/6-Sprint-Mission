import { Routes, Route } from 'react-router-dom';

import React from 'react';
import Layout from './components/Layout';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ItemsList from './pages/ItemsList';
import AddItem from './pages/AddItem';
import Community from './pages/Community';
import Item from './pages/Item';
import NotFound from './pages/NotFound';

function App() {
	return (
		<Routes>
			<Route
				path='/'
				element={
					<Layout isHeader isFooter>
						<Home />
					</Layout>
				}
			/>
			<Route path='/SignIn' element={<SignIn />} />
			<Route path='/SignUp' element={<SignUp />} />
			<Route path='/Items'>
				<Route
					index
					element={
						<Layout isHeader>
							<ItemsList />
						</Layout>
					}
				/>
				<Route
					path=':productId'
					element={
						<Layout isHeader>
							<Item />
						</Layout>
					}
				/>
			</Route>
			<Route
				path='/Community'
				element={
					<Layout isHeader>
						<Community />
					</Layout>
				}
			/>
			<Route
				path='/AddItem'
				element={
					<Layout isHeader site='/AddItem'>
						<AddItem />
					</Layout>
				}
			/>
			<Route
				path='*'
				element={
					<Layout isHeader>
						<NotFound />
					</Layout>
				}
			/>
		</Routes>
	);
}

export default App;
