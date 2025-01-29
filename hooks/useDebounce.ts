import { useCallback, useRef } from 'react';

export function useDebounce<T extends (arg: string) => unknown>(
    callback: T,
    delay: number
): (arg: string) => void {
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    return useCallback(
        (arg: string) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                callback(arg);
            }, delay);
        },
        [callback, delay]
    );
} 