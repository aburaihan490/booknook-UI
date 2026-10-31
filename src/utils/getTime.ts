'use cache';

import { cacheLife } from 'next/cache';

const getTime = async () => {
    cacheLife('weeks');
    return new Date().getFullYear();
};

export default getTime;
