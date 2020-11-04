import { get } from 'axios'
import useSWR from 'swr';

export const fetcher = (...args) => get(...args).then(resp => resp.data).catch(error=> console.log(error.toJSON()));
export default function useData(url) {
    return useSWR(url, fetcher)
}
