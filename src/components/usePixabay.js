import { useState, useEffect, useCallback } from "react";

export function usePixabay(word) {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!word) return;
        const fetchImages = async () => {
            setIsLoading(true);
            try {
                const fetching = await fetch(
                    `https://pixabay.com/api/?key=50834834-38d93ed52f356f352f281d28a&q=${word}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
                )
                const data = await fetching.json()

                setImages((prev) => [...prev, ...data.hits]);
            } catch (err) {
                console.error("Помилка при завантаженні фото:", err);
            } finally { setIsLoading(false) }
        }
        fetchImages()
    }, [word, page]);

    const reset = useCallback(() => {
        setImages([]);
        setPage(1)
    }, [])

    const handleLoadMore = useCallback(() => setPage(prev => prev + 1), []);
    return {
        handleLoadMore,
        images,
        reset,
        isLoading,
    };
}
// :)