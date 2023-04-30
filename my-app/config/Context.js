import {onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithRedirect, signOut} from 'firebase/auth';
import { auth } from '@/config/firebase';
import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({children, }) => {
    const [user, setUser] = useState({ email: null, uid: null });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    email: user.email,
                    uid: user.uid,
                });
            } else {
                setUser({ email: null, uid: null });
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signUp = (email, password) => {
        let result = null,
            error = null;
        try {
            result = createUserWithEmailAndPassword(auth, email, password);
        } catch (e) {
            error = e;
        }
    
        return { result, error };
    }

    const signIn = (email, password) => {
        let result = null,
            error = null;
        try {
            result = signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
            error = e;
        }
    
        return { result, error };
    }

    const logOut = async() => {
        setUser({ email: null, uid: null })
        await signOut(auth)
    }

    return (
        <AuthContext.Provider value={{ user, signUp, signIn, logOut }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};