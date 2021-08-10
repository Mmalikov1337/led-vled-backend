import * as React from "react";
import {
	Edit,
	TextInput,
	required,
	TabbedForm,
	FormTab,
	ImageInput,
	NumberInput,
	ImageField,
} from "react-admin";

export const ItemEdit = (props) => (
	<Edit title="Редактирование товара" {...props}>
		<TabbedForm resource="items">
			<FormTab label="Главное">
				<TextInput disabled label="ID" source="id" />
				<TextInput label="Название" source="name" validate={required()} />
				<NumberInput label="Цена" source="price" validate={required()} />
				<TextInput label="Калории" source="kal" />
				<TextInput label="Вес" source="size" />
				<TextInput label="Рейтинг" source="rating" validate={required()} />
				<NumberInput label="Осталось" source="quantity" validate={required()} />
			</FormTab>
			<FormTab label="Описание">
				<TextInput fullWidth label="Описание" source="description" addLabel={false} />
				<ImageInput source="image" label="Изображение" accept="image/*">
					<ImageField source="src" title="title" />
				</ImageInput>
			</FormTab>
		</TabbedForm>
	</Edit>
);

export default ItemEdit;
