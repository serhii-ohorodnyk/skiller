import "styled-components";

import { AppTheme } from "app/styles";

declare module "styled-components" {
  // define default styled component theme as application theme
  export interface DefaultTheme extends AppTheme {}
}
