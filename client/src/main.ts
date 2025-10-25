import './style/global.css';

import {SetRoutes} from "./routing.ts";
import * as Views from "./views";

const root = document.querySelector<HTMLDivElement>("#app");
if(!root) { throw "Could not locate application root div with id 'app'";}

export const appRouter = SetRoutes(
    root,
    {
        "/"             : Views.Dashboard,
    },
    Views.NotFound
);

