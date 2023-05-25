import React from 'react';
import { supabase } from './supabase';

export const usePhoto = (id: string | string[] | undefined) => {
    const [photos, setPhoto] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        (async () => {
            if (!id) {
                setIsLoading(false);
                setPhoto(null);
                return;
            }
            setIsLoading(true);

            const response = await supabase.from('photos').select().eq('id',id).single();

            setPhoto(response.data);
            setIsLoading(false);
        })();
    }, [id]);

    return [photos, isLoading];
}

export default usePhoto;