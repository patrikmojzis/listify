import {router, useForm} from "@inertiajs/react";
import {useCallback, useMemo} from "react";

const useFiltersHook = (defaultData) => {

    const parsedDefaultData = useMemo(() => {
        let transformedData = {...defaultData};
        transformedData['completed'] = transformedData['completed'] !== undefined ? transformedData['completed'] === 'true' : null;
        transformedData['assigned_to'] = transformedData['assigned_to'] ? [].concat(transformedData['assigned_to']) : []; // Ensures it's an array
       console.log('transformedData[\'assigned_to\']', transformedData['assigned_to']);
        return transformedData;
    }, [defaultData]);

    const {data, setData, get} = useForm(parsedDefaultData);

    /**
     * Function to update URL with new filters, including arrays
     */
    const updateUrlWithFilters = useCallback((newFilters) => {
        const currentUrl = new URL(window.location.href);
        const params = new URLSearchParams(currentUrl.search);

        Object.keys(newFilters).forEach(key => {
            const value = newFilters[key];

            // Remove present filters
            if (Array.isArray(value)) {
                const paramsToRemove = [];
                // If the value is an array, remove all keys that start with the key
                params.forEach((paramValue, paramKey) => {
                    if (paramKey.startsWith(key.slice(0, -2))) { // remove [] from key
                        paramsToRemove.push(paramKey);
                    }
                });
                paramsToRemove.forEach(key => params.delete(key));
            } else {
                params.delete(key);
            }

            // Add new filters
            if (Array.isArray(value)) {
                value.forEach(val => { params.append(key, val); });
            } else if (value !== '' && value !== null) {
                params.set(key, value);
            }

        });

        params.delete('page'); // Reset page

        return `${currentUrl.origin}${currentUrl.pathname}?${params.toString()}`;
    }, []);

    /**
     * Transforms data into format: 'filters[some_filter]': 'new_value' or 'filters[some_filter][]': ['value1', 'value2']
     */
    const update = useCallback(() => {
        let transformedData = {};

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const value = data[key];

                if (Array.isArray(value)) {
                    transformedData[`filters[${key}][]`] = value;
                } else {
                    transformedData[`filters[${key}]`] = value === '' ? null : value;
                }
            }
        }

        const url = updateUrlWithFilters(transformedData);
        router.get(url);
    }, [data]);

    return {data, setData, update}
}

export default useFiltersHook;
