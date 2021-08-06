import * as React from 'react';
import { FC } from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';

interface Props {
    value?: number;
}

const NbNewOrders: FC<Props> = ({ value }) => {
    return (
        <CardWithIcon
            to="/orders"
            icon={ShoppingCartIcon}
            title={'Новые заказы'}
            subtitle={value}
        />
    );
};

export default NbNewOrders;
