'use client';
import { InputText } from '@/components/InputText/InputText';
import type { Demo } from '@/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IconService } from '../../../../demo/service/IconService';

const IconsDemo = () => {
    const [icons, setIcons] = useState<Demo.Icon[]>([]);
    const [filteredIcons, setFilteredIcons] = useState<Demo.Icon[]>([]);

    useEffect(() => {
        const fetchIcons = async () => {
            try {
                const data = await IconService.getIcons();
                const sortedData = [...data].sort((icon1, icon2) => {
                    const name1 = icon1.properties?.name || '';
                    const name2 = icon2.properties?.name || '';
                    return name1.localeCompare(name2);
                });

                setIcons(sortedData);
                setFilteredIcons(sortedData);
            } catch (error) {}
        };

        fetchIcons();
    }, []);

    const onFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value.toLowerCase();
        if (!searchValue) {
            setFilteredIcons(icons);
        } else {
            setFilteredIcons(
                icons.filter((it) => {
                    return it.icon?.tags?.some((tag) => tag.toLowerCase().includes(searchValue));
                })
            );
        }
    };

    return (
        <div className="card">
            <h2>Icons</h2>
            <p>
                d-admin components internally use{' '}
                <Link href="https://www.npmjs.com/package/drjicons" className="font-medium hover:underline text-primary" target={'_blank'}>
                    drjicons
                </Link>{' '}
                library, the official icons suite from{' '}
                <Link href="https://www.dheerajrs.com/" className="font-medium hover:underline text-primary" target={'_blank'}>
                    dheeraj-rs
                </Link>
                .
            </p>
            <h4>Download</h4>
            <p>drjicons is available at npm, run the following command to download it to your project.</p>
            <pre className="app-code">
                <code>{`npm install drjicons --save`}</code>
            </pre>
            <h4>Getting Started</h4>
            <p>
                drjicons use the <strong>pi pi-&#123;icon&#125;</strong> syntax such as <strong>pi pi-check</strong>. A standalone icon can be displayed using
                an element like <i>i</i> or <i>span</i>
            </p>
            <pre className="app-code">
                <code>
                    {`<i className="pi pi-check" style={{ marginRight: '.5rem' }}></i>
<i className="pi pi-times"></i>`}
                </code>
            </pre>
            <h4>Size</h4>
            <p>Size of the icons can easily be changed using font-size property.</p>
            <pre className="app-code">
                <code>
                    {`
<i className="pi pi-check"></i>
`}
                </code>
            </pre>
            <i className="pi pi-check"></i>

            <pre className="app-code">
                <code>
                    {`
<i className="pi pi-check" style={{ fontSize: '2rem' }}></i>
`}
                </code>
            </pre>
            <i className="pi pi-check" style={{ fontSize: '2rem' }}></i>
            <h4>Spinning Animation</h4>
            <p>Special pi-spin class applies continuous rotation to an icon.</p>
            <pre className="app-code">
                <code>{`<i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>`}</code>
            </pre>
            <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
            <h4>List of Icons</h4>
            <p>
                Here is the current list of drjicons, more icons are added periodically. You may also{' '}
                <Link href="https://github.com/dheeraj-rs" className="font-medium hover:underline text-primary" target={'_blank'}>
                    request new icons
                </Link>{' '}
                at the issue tracker.
            </p>
            <div>
                <InputText type="text" className="w-full p-3 mt-3 mb-5" onChange={onFilter} placeholder="Search an icon" />
            </div>
            <div className="grid icons-list text-center">
                {filteredIcons &&
                    filteredIcons.map((iconMeta) => {
                        const { icon, properties } = iconMeta;

                        return (
                            icon?.tags?.indexOf('deprecate') === -1 && (
                                <div className="col-6 sm:col-4 lg:col-3 xl:col-2 pb-5" key={properties?.name}>
                                    <i className={'text-2xl mb-2 pi pi-' + properties?.name}></i>
                                    <div>pi-{properties?.name}</div>
                                </div>
                            )
                        );
                    })}
            </div>
        </div>
    );
};

export default IconsDemo;
