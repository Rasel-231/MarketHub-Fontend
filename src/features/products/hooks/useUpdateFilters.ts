import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

export const useUpdateFilters = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateFilters = useCallback((newParams: Record<string, string | number | null>) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(newParams).forEach(([key, value]) => {
            if (value === null || value === undefined || value === "") {
                params.delete(key);
            } else {
                params.set(key, String(value));
            }
        });

        if (!newParams.page) {
            params.set("page", "1");
        }

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, [searchParams, pathname, router]);

    return { updateFilters, searchParams };
};