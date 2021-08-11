import * as React from "react";
import { FC } from "react";
import { CreateButton, EditButton, List, ListProps, useListContext } from "react-admin";
import { Grid, Card, CardMedia, CardContent, CardActions, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Record } from "ra-core";

interface Category extends Record {
	name: string;
}
const useStyles = makeStyles({
	root: {
		marginTop: "1em",
	},
	media: {
		height: 140,
		backgroundSize: "contain",
		marginTop: "15px",
	},
	title: {
		paddingBottom: "0.5em",
	},
	actionSpacer: {
		display: "flex",
		justifyContent: "space-around",
	},
});
const getImage = (data: Category) => {
	try {
		return data.image ? JSON.parse(data.image).src : "";
	} catch (e) {
		console.log(e.message, e.name, "<< getImage");
	}
};
const ItemsGrid: FC = (props) => {
	const classes = useStyles(props);
	const { data, ids } = useListContext<Category>();
	return ids ? (
		<Grid container spacing={2} className={classes.root}>
			{ids.map((id, index) => (
				<Grid key={id} xs={12} sm={6} md={4} lg={3} xl={2} item>
					<Card>
						<CardMedia
							image={getImage(data[id])}
							className={classes.media}
							onClick={() => {
								console.log(data[id], data, "<<<");
							}}
						/>
						<CardContent className={classes.title}>
							<Typography variant="h5" component="h2" align="center">
								{data[id].name}
							</Typography>
							<Typography variant="subtitle2" component="p" align="left" color="textPrimary">
								{data[id].quantity}шт
							</Typography>
							<Typography variant="subtitle2" component="span" align="right" color="secondary">
								{data[id].price}₽
							</Typography>
						</CardContent>
						<CardActions classes={{ spacing: classes.actionSpacer }}>
							<EditButton basePath="/items" record={data[id]} />
						</CardActions>
					</Card>
				</Grid>
			))}
			<CreateButton basePath="/items"/>
		</Grid>
	) : null;
};

const ItemsList: FC<ListProps> = (props) => (
	<List
		{...props}
		sort={{ field: "name", order: "ASC" }}
		perPage={20}
		pagination={false}
		component="div"
		actions={false}
		title="Товары"
	>
		<ItemsGrid />
	</List>
);

export default ItemsList;
