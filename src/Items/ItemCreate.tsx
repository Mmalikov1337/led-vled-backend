import * as React from 'react';
import {
    Create,
    TextInput,
    required,
    TabbedForm,
    FormTab,
    ImageInput,
    ImageField,
    NumberField,
    NumberInput
} from 'react-admin';

const ItemCreate = (props: any) => {
    return (
        <Create title="Создание товара" {...props}>
            <TabbedForm
            resource="items"
        >
            <FormTab label="Главное">
                <TextInput label="Название" source="name" validate={required()} />
                <NumberInput label="Цена" source="price" validate={required()}/>
                <TextInput label="Калории" source="kal"  />
                <TextInput label="Вес" source="size" />
                <TextInput label="Рейтинг" source="rating" validate={required()}/>
                <NumberInput label="Осталось" source="quantity" validate={required()}/>
            </FormTab>
            <FormTab label="Описание">
                <TextInput fullWidth label="Описание" source="description" addLabel={false} />
                <ImageInput source="image" label="Изображение" accept="image/*">
                    <ImageField source="src" title="title" />
                </ImageInput>
            </FormTab>
        </TabbedForm>
        </Create>
    );
};

export default ItemCreate;
