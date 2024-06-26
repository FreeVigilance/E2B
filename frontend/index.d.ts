declare module '*.png' {
    export default '' as string;
}
declare module '*.svg' {
    import React = require('react');

    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

declare module '*.jpeg' {
    export default '' as string;
}
declare module '*.jpg' {
    export default '' as string;
}
