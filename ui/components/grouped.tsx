import { useRef, useState } from "react";

type data_hook = () => [((x: string) => void) | null, string[]];

export interface grouped_props {
    useData: data_hook;
}

export function Grouped(props: grouped_props) {
    let { useData } = props;

    const [set, data] = useData();

    return (
        <>
            {set !== null && <input onChange={(e) => set(e.target.value)}></input>}
            <li>
                {data.map((x, i) => <p key={`${x}-${i}`}>{x}</p>)}
            </li>
        </>
    );
}

export function getData1(): data_hook {
    return () => {
        const x = useRef('hi');
        return [(_x: string) => x.current = _x, [x.current]];
    };
}

export function getData2(n: number, x: string): data_hook {
    return () => [null, Array.from<string>({ length: n }).fill(x)];
}
