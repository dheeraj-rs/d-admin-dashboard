'use client';

import { Menu, MenuRef } from '@/components/Menu/Menu';
import { useRef } from 'react';

function ConfirmationDemo() {
    const menu = useRef<MenuRef>(null);
    const items = [{ label: 'Your Menu Item' }];

    const template = (
        <div className="flex align-items-center py-5 px-3">
            <i className="pi pi-fw pi-check mr-2 text-2xl" />
            <p className="m-0 text-lg">Confirmation Component Content via Child Route</p>
        </div>
    );

    return <Menu ref={menu} model={items} popup />;
}

export default ConfirmationDemo;
