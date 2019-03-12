import "grommet";

declare module "grommet" {
  // This is by far not the complete grommet theme.
  // If you need some properties - check it in runtime (remember to extend it here)
  interface GrommetTheme {
    global: GlobalTheme;
    icon: IconTheme;
  }

  interface GlobalTheme {
    borderSize: GlobalBorderSizes;
    breakpoints: GlobalBreakpoints;
    colors: GlobalColors;
    deviceBreakpoints: GlobalDeviceBreakpoints;
    edgeSize: GlobalEdgeSize;
    size: GlobalSize;
  }

  interface GlobalBorderSizes {
    xsmall: string;
    small: string;
    medium: string;
    large: string;
    xlarge: string;
  }

  interface GlobalBreakpoints {
    small: ThemeBreakpoint;
    medium: ThemeBreakpoint;
    large: ThemeBreakpoint;
  }

  interface ThemeBreakpoint extends Partial<Omit<GlobalTheme, "breakpoints">> {
    value: number;
  }

  interface GlobalColors {
    black: string;
    white: string;
    brand: string;
    active: string;
    border: {
      dark: string;
      light: string;
    };
    control: {
      dark: string;
      light: string;
    };
    focus: string;
    icon: {
      dark: string;
      light: string;
      0: string;
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
      6: string;
    };
    placeholder: string;
    selected: string;
    text: {
      dark: string;
      light: string;
    };

    "light-1": string;
    "light-2": string;
    "light-3": string;
    "light-4": string;
    "light-5": string;
    "light-6": string;

    "dark-1": string;
    "dark-2": string;
    "dark-3": string;
    "dark-4": string;
    "dark-5": string;
    "dark-6": string;

    "accent-1": string;
    "accent-2": string;
    "accent-3": string;
    "accent-4": string;

    "neutral-1": string;
    "neutral-2": string;
    "neutral-3": string;
    "neutral-4": string;

    "status-critical": string;
    "status-error": string;
    "status-warning": string;
    "status-ok": string;
    "status-unknown": string;
    "status-disabled": string;
  }

  interface GlobalDeviceBreakpoints {
    phone: keyof GlobalBreakpoints;
    tablet: keyof GlobalBreakpoints;
    computer: keyof GlobalBreakpoints;
  }

  interface GlobalEdgeSize {
    none: string;
    hair: string;
    xxsmall: string;
    xsmall: string;
    small: string;
    medium: string;
    large: string;
    xlarge: string;
  }

  interface GlobalSize {
    xxsmall: string;
    xsmall: string;
    small: string;
    medium: string;
    large: string;
    xlarge: string;
    xxlarge: string;
    full: string;
  }

  interface IconTheme {
    size: IconThemeSize;
  }

  interface IconThemeSize {
    small: string;
    medium: string;
    large: string;
    xlarge: string;
  }
}
