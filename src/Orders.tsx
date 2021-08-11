import React from "react";
import { FC } from "react";
import RichTextInput from 'ra-input-rich-text';
import {
	DateInput,
	Edit,
	SimpleForm,
	TextInput,
	TextField,
	Datagrid,
	List,
	Create,
	downloadCSV,
	Filter,
	SearchInput,
	DateField,
	NumberInput,
	CheckboxGroupInput,
	BooleanInput,
	FormTab,
	TabbedForm,
	ChipField,
	NumberField,
	SelectInput,
} from "react-admin";
import jsonExport from "jsonexport/dist";
import { JsonField } from "react-admin-json-view";

const exporter = (posts) => {
	const postsForExport = posts.map((post) => {
		post.basket = post.basket ? JSON.stringify(post.basket) : ""
		return post;
	});
	console.log("postsForExport>>",postsForExport,"<<postsForExport");
	
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
			<ChipField label="Статус" source="status" />
			<NumberField label="Сумма" source="totalPrice" />
			{/* <EditButton basePath="/posts" /> */}
		</Datagrid>
	</List>
);
interface IPostTitle {
	record?: {
		title: string;
	};
}
export const OrderEdit = (props) => {
	return (
		<Edit {...props}>
			<TabbedForm>
				<FormTab label="Информация о заказе">
					<TextInput label="Имя" source="name" />
					<TextInput label="Номер телефона" source="tel" />
					<TextInput label="Электронная почта" source="email" />
					<TextInput label="Город" source="cityAddress" />
					<TextInput label="Адрес" source="houseNumber" />
					<TextInput label="Почтовый индекс" source="postalCode" />
					<TextInput label="Промокод" source="promo" />
					<TextInput label="Инстаграм" source="instagram" />
					<TextInput label="Способ доставки" source="deliveryMethod" />
					<DateInput label="Дата" source="date" />
					<SelectInput
						source="status"
						label="Статус"
						choices={[
							{ id: "ordered", name: "Заказано" },
							{ id: "shipped", name: "Отправлено" },
							{ id: "delivered", name: "Доставлено" },
							{ id: "cancelled", name: "Отменено" },
						]}
					/>
						<BooleanInput label="Дом, не квартира" source="houseOrApartment"  />
					<NumberInput disabled label="Сумма" source="totalPrice" />
					<RichTextInput label="Комментарий" source="comment" />
				</FormTab>
				<FormTab label="Состав заказа">
					<JsonField
						source="basket"
						jsonString={false}
						reactJsonOptions={{
							name: null,
							collapsed: false,
							enableClipboard: false,
							displayDataTypes: false,
						}}
					/>
				</FormTab>
				<FormTab label="Мета">
					<TextField label="ID пользователя" source="uid" />
					<TextField label="Ссылка для подтверждения" source="confirmation_url" />
					<TextField label="ID в базе данных" source="id" />
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
