import { ref } from "vue";
import axios, { AxiosResponse } from "axios";
type resultType = {
    author: string
    authorSlug: string
    content: string
    dateAdded: string
    dateModified: string
    length: number
}
function useUrlAxios(url: string) {
    const result = ref({} as resultType);
    const loading = ref(true);
    const laoded = ref(false);
    const error = ref(null);
    axios.get(url).then((res: AxiosResponse<resultType>) => {
        result.value = res.data;
        loading.value = false;
        laoded.value = true;


    }).catch((err) => {
        error.value = err;
        loading.value = false;
        console.log(error.value);


    })

    return { result, loading, laoded, error };

}
export default useUrlAxios