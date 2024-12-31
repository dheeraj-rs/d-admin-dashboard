import { CSSTransitionProps } from '@/types';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const CSSTransition: React.FC<CSSTransitionProps> = ({ in: inProp, timeout, classNames, children, onEnter, onExit }) => {
    const nodeRef = useRef<HTMLElement | null>(null);
    const [mounted, setMounted] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout>();

    const updateClasses = useCallback(
        (node: HTMLElement, addClasses: string[], removeClasses: string[]) => {
            removeClasses.forEach((cls) => node.classList.remove(`${classNames}-${cls}`));
            addClasses.forEach((cls) => node.classList.add(`${classNames}-${cls}`));
        },
        [classNames]
    );

    const cleanup = () => timeoutRef.current && clearTimeout(timeoutRef.current);

    useEffect(() => {
        setMounted(true);
        return () => {
            cleanup();
            setMounted(false);
        };
    }, []);

    useEffect(() => {
        if (!mounted || !nodeRef.current) return;
        const node = nodeRef.current;
        cleanup();

        const performTransition = async () => {
            if (inProp) {
                node.style.display = '';
                updateClasses(node, ['enter'], ['exit', 'exit-active', 'exit-done']);

                await new Promise((resolve) => requestAnimationFrame(resolve));
                node.scrollTop; // Force reflow
                updateClasses(node, ['enter-active'], []);
                onEnter?.();

                // timeoutRef.current = setTimeout(() => {
                //     updateClasses(node, ['enter-done'], ['enter', 'enter-active']);
                // }, timeout.enter);
            } else {
                updateClasses(node, ['exit'], ['enter', 'enter-active', 'enter-done']);

                await new Promise((resolve) => requestAnimationFrame(resolve));
                node.scrollTop;
                updateClasses(node, ['exit-active'], []);
                onExit?.();
                timeoutRef.current = setTimeout(() => {
                    updateClasses(node, ['exit-done'], ['exit', 'exit-active']);
                }, timeout.exit);
            }
        };

        performTransition();
    }, [inProp, mounted, classNames, timeout.enter, timeout.exit, onEnter, onExit, updateClasses]);

    return React.cloneElement(children, {
        ref: nodeRef,
        onMouseEnter: () => {
            if (nodeRef.current) {
                cleanup();
                updateClasses(nodeRef.current, ['enter-done'], ['exit', 'exit-active', 'exit-done']);
            }
        },
        className: `${children.props.className || ''} ${classNames}`.trim(),
        style: {
            ...children.props.style,
            display: mounted ? undefined : 'none',
        },
    });
};

export { CSSTransition };
