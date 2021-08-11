import React from "react";

import { Admin, Resource } from "react-admin";
import getProvider from "./getDataProvider";
import getAuthProvider from "./AuthProvider";
import { OrderEdit, OrderList } from "./Orders";
import items from "./Items"
import { createBrowserHistory as createHistory } from 'history';
import {Dashboard} from "./Dashboard";
const history = createHistory();

const dataProvider = getProvider("/api");
const authProvider = getAuthProvider("/api");

function App() {
	return (
		<Admin dataProvider={dataProvider} title={"Лёд Влёд"} authProvider={authProvider} history={history} dashboard={Dashboard}>
			<Resource name="orders" list={OrderList} edit={OrderEdit}/>
			<Resource name="items"  {...items}/>
			
		</Admin>
	);
}

export default App;
