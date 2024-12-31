import { useContext } from 'react';
import { LayoutContext } from './context/layoutContext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            <img src={`/layout/logo-${layoutConfig.colorScheme === 'dark' ? 'dark' : 'white'}.svg`} alt="Logo" />
            <span>by</span>
            <span>D-Admin</span>
        </div>
    );
};

export default AppFooter;
