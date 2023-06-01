import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

export default function User() {
    const [user, setUser] = useState<any>();
    const [firstName, setFirstName] = useState<any>();
    const [loading, setLoading] = useState(true);

    async function fetchUserData() {
        try {
            setLoading(true);
            const user = await supabase.auth.getUser();
            setUser(user.data.user);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    return user;
}
