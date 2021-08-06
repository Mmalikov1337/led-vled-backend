import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Title, useDataProvider, useVersion } from "react-admin";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { FC } from "react";
import { useMediaQuery, Theme } from "@material-ui/core";
// const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, ...];
interface IRenderLineChart {
	data: Array<any>;
}
const dateFormatter = (date: number): string =>
    new Date(date).toLocaleDateString('ru-RU');
    
const aMonthAgo = new Date();
aMonthAgo.setDate(aMonthAgo.getDate() - 30);
const RenderLineChart: FC<IRenderLineChart> = ({ data }) => {
	return (
		<LineChart
			width={600}
			height={300}
			data={data}
			margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
		>
			<Line type="monotone" dataKey="totalPrice" stroke="#000000" />
			<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
			<XAxis
				dataKey="mapDate"
			/>
			<YAxis />
			<Tooltip />
		</LineChart>
	);
};

const Charts: FC = () => {
	const version = useVersion();
	const dataProvider = useDataProvider();
	const [state, setstate] = React.useState(null);

	const fetchOrders = React.useCallback(async () => {
		const aMonthAgo = new Date();
		aMonthAgo.setDate(aMonthAgo.getDate() - 30);
		const { data: recentOrders } = await dataProvider.getList("orders", {
			filter: { date_gte: aMonthAgo.toISOString() },
			sort: { field: "date", order: "DESC" },
			pagination: { page: 1, perPage: 50 },
		});
		console.log("recentOrders", recentOrders);
        const edited = recentOrders.map((it) => {
            it.mapDate = new Date(it.date).getUTCDay()
        })
		setstate(recentOrders);
	}, [dataProvider]);

	React.useEffect(() => {
		fetchOrders();
	}, [version]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Card>
			<Title title="Welcome to the administration" />
			<CardContent>Lorem ipsum sic dolor amet...</CardContent>
			<RenderLineChart data={state} />
		</Card>
	);
};

export default Charts;
