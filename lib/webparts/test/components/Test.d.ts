import * as React from 'react';
import './App.css';
interface Myprop {
    string: string;
}
export default class Test extends React.Component<Myprop, any> {
    constructor(props: any);
    numInput(e: any): void;
    operInput(e: any): void;
    decInput(e: any): void;
    clearInput: () => void;
    getPercent: (e: any) => void;
    calculate: () => void;
    opBrackets: () => void;
    clBrackets: () => void;
    render(): React.ReactElement<Myprop, any>;
}
export {};
//# sourceMappingURL=Test.d.ts.map