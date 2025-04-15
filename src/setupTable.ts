import { ModuleRegistry } from "ag-grid-community";
import {
  ClientSideRowModelModule,
  themeAlpine,
  colorSchemeLightWarm,
} from "ag-grid-community";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export const tableTheme = themeAlpine.withPart(colorSchemeLightWarm);
