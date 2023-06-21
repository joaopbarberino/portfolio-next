// https://mui.com/material-ui/react-use-media-query/#UseWidth.tsx
import { Breakpoint, Theme, useTheme, useMediaQuery } from '@mui/material';

type BreakpointOrNull = Breakpoint | null;

export const useWidth = () => {
    const theme: Theme = useTheme();
    const keys: readonly Breakpoint[] = [...theme.breakpoints.keys].reverse();
    return (
        keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const matches = useMediaQuery(theme.breakpoints.up(key));
            return !output && matches ? key : output;
        }, null) || 'xs'
    );
}