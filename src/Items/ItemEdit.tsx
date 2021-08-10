import * as React from 'react';
import {
    Edit,
    TextInput,
    required,
    TabbedForm,
    FormTab,
    ImageInput,
    ImageField
} from 'react-admin';

export const ItemEdit = (props) => (
    <Edit title="Редактирование товара" {...props}>
        <TabbedForm
            resource="items"
        >
            <FormTab label="Главное">
                <TextInput disabled label="ID" source="id" />
                <TextInput label="Название" source="name" validate={required()} />
                <TextInput label="Цена" source="price" validate={required()}/>
                <TextInput label="Калории" source="kal" validate={required()} />
                <TextInput label="Вес" source="size" validate={required()}/>
                <TextInput label="Рейтинг" source="rating" validate={required()}/>
                <TextInput label="Осталось" source="quantity" validate={required()}/>
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
