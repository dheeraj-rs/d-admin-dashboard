let _ripple: boolean = false;
let _theme: string = 'lara-light-indigo';

const handleRippleEffect = (value: boolean): void => {
    if (value) {
        document.addEventListener('click', createRipple);
    } else {
        document.removeEventListener('click', createRipple);
    }
};

const createRipple = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const rippleElement = target.closest('.p-ripple') as HTMLElement;

    if (rippleElement) {
        const rect = rippleElement.getBoundingClientRect();
        const diameter = Math.max(rippleElement.clientWidth, rippleElement.clientHeight);
        const radius = diameter / 2;

        rippleElement.style.position = 'relative';
        rippleElement.style.overflow = 'hidden';

        const ink = document.createElement('span');
        ink.className = 'p-ink';
        ink.style.width = ink.style.height = `${diameter}px`;
        ink.style.left = `${event.clientX - rect.left - radius}px`;
        ink.style.top = `${event.clientY - rect.top - radius}px`;

        const existingInk = rippleElement.querySelector('.p-ink');
        if (existingInk) {
            existingInk.remove();
        }

        rippleElement.appendChild(ink);

        ink.offsetHeight;
        ink.classList.add('p-ink-active');

        ink.addEventListener('animationend', () => {
            ink.remove();
        });
    }
};

const ThemeManager = {
    get ripple(): boolean {
        return _ripple;
    },

    set ripple(value: boolean) {
        _ripple = value;
        handleRippleEffect(value);
    },

    changeTheme(currentTheme: string, newTheme: string, linkElementId: string, callback?: () => void): void {
        const linkElement = document.getElementById(linkElementId) as HTMLLinkElement;
        if (linkElement) {
            linkElement.setAttribute('href', `/themes/${newTheme}/theme.css`);
            _theme = newTheme;
            if (callback) {
                callback();
            }
        }
    },
};

export { ThemeManager };
