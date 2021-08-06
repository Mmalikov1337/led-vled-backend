import * as React from 'react';
import { FC } from 'react';
import DollarIcon from '@material-ui/icons/AttachMoney';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';

interface Props {
    value?: string;
}

const MonthlyRevenue: FC<Props> = ({ value }) => {
    return (
        <CardWithIcon
            to="/orders"
            icon={DollarIcon}
            title={'Месячный доход'}
            subtitle={value}
        />
    );
};

export default MonthlyRevenue;
