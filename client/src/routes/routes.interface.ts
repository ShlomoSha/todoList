import type { LoaderFunctionArgs } from "react-router-dom";

export type LoaderFunction<TData> = (
    args: LoaderFunctionArgs
) => Promise<TData> | TData

export interface RouteConfig<TLoaderData = any> {
    path: string;
    component?: React.ComponentType;
    defaultRoute?: string;
    loader?: LoaderFunction<TLoaderData>;
    children?: RouteConfig[]
}
