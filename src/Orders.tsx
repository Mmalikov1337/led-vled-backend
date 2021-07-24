import React, { cloneElement, useContext } from "react";
import { FC } from "react";
import {
	DateInput,
	Edit,
	SimpleForm,
	TextInput,
	TextField,
	Datagrid,
	List,
	Create,
	Button,
	CreateButton,
	ExportButton,
	TopToolbar,
	downloadCSV,
	Filter,
	FilterProps,
	NullableBooleanInput,
	SearchInput,
	DateField,
	NumberInput,
	CheckboxGroupInput,
	BooleanInput,
	EditButton,
	FormTab,
	minValue,
	number,
	ReferenceManyField,
	required,
	TabbedForm,
	useGetOne,
} from "react-admin";

// import IconEvent from "@material-ui/icons/Event";

import jsonExport from "jsonexport/dist";
import { JsonField, JsonInput } from "react-admin-json-view";
const exporter = (posts) => {
	const postsForExport = posts.map((post) => {
		return post;
	});
	jsonExport(
		postsForExport,
		{
			headers: [
				"id",
				"basket",
				"name",
				"tel",
				"email",
				"cityAddress",
				"houseNumber",
				"houseOrApartment",
				"postalCode",
				"promo",
				"instagram",
				"comment",
				"deliveryMethod",
				"status",
				"uid",
				"date",
				"confirmation_url",
			], // order fields in the export
		},
		(err, csv) => {
			downloadCSV(csv, "orders"); // download as 'posts.csv` file
		}
	);
};
// const postFilters = [
//     <TextInput label="Search" source="q" alwaysOn />,
//     <TextInput label="Title" source="title" defaultValue="Hello, World!" />,
// ];

const OrderFilter: FC = (props) => (
	<Filter {...props}>
		<SearchInput name="asd" placeholder="Имя" source="search_name" />
		<SearchInput placeholder="Город" source="search_city" />
		<SearchInput placeholder="Промокод" source="search_promo" />
		<SearchInput placeholder="ID" source="search_id" />
		<DateInput label="После даты" source="date_gte" />
		<DateInput label="До даты" source="date_lte" />
		<NumberInput label="Стоимость больше чем" source="price_gte" />
		<NumberInput label="Стоимость меньше чем" source="price_lte" />
		<CheckboxGroupInput
			source="status"
			label="Статус заказа"
			choices={[
				{ id: "ordered", name: "Заказано" },
				{ id: "shipped", name: "Отправлено" },
				{ id: "delivered", name: "Доставлено" },
				{ id: "canceled", name: "Отменено" },
			]}
		/>
		{/* <NullableBooleanInput source="returned" /> */}
	</Filter>
);

export const OrderList: FC = (props) => (
	<List {...props} exporter={exporter} filters={<OrderFilter />}>
		<Datagrid rowClick="edit">
			<TextField label="Id" source="id" />
			<TextField label="Имя" source="name" />
			<TextField label="Город" source="cityAddress" />
			<TextField label="Промокод" source="promo" />
			<DateField label="Дата" source="date" />
			<TextField label="Статус" source="status" />
			<TextField label="Сумма" source="totalPrice" />
			{/* <EditButton basePath="/posts" /> */}
		</Datagrid>
	</List>
);
interface IPostTitle {
	record?: {
		title: string;
	};
}
const PostTitle: FC<IPostTitle> = ({ record }) => {
	return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

export const OrderEdit = (props) => {
	return (
		<Edit {...props}>
			<TabbedForm>
				<FormTab label="Информация о заказе">
					<TextInput disabled label="Id" source="id" />
					<TextInput source="name" />
					<TextInput label="Телефон" source="tel" />
					<TextInput label="Город" source="cityAddress" />
					<TextInput label="Адрес" source="houseNumber" />
					<TextInput label="Дом или квартира" source="houseOrApartment" />
					<TextInput label="Почтовый индекс" source="postalCode" />
					<TextInput label="Промокод" source="promo" />
					<TextInput label="Инстаграм" source="instagram" />
					<TextInput label="Способ доставки" source="deliveryMethod" />
					<TextInput label="Статус" source="status" />
					<DateInput label="Дата" source="date" />
					<NumberInput label="Сумма" source="totalPrice" />
					<TextInput label="Комментарий" source="comment" />
				</FormTab>
				{/* <FormTab label="body">
                <RichTextInput source="body" validate={required()} addLabel={false} />
            </FormTab> */}
				<FormTab label="Заказ">
					<JsonField
						source="basket"
						jsonString={false} // Set to true if the value is a string, default: false
						reactJsonOptions={{
							// Props passed to react-json-view
							name: null,
							collapsed: false,
							enableClipboard: false,
							displayDataTypes: false,
							
						}}
						
					/>
				</FormTab>
			</TabbedForm>
		</Edit>
	);
};

export const PostCreate = (props) => (
	<Create title="Create a Post" {...props}>
		<SimpleForm>
			<TextField source="id" />
			<TextInput source="name" />
			<TextInput source="tel" />
			<TextInput source="email" />
			<TextInput source="cityAddress" />
			<TextInput source="houseNumber" />
			<TextInput source="postalCode" />
			<TextInput source="promo" />
			<TextInput source="instagram" />
			<TextInput source="totalPrice" />
		</SimpleForm>
	</Create>
);
