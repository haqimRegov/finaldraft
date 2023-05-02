import {onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithRedirect, signOut} from 'firebase/auth';
import { auth } from '@/config/firebase';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router'

export const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({children, }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    const router = useRouter()

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

    const signUp = async(email, password) => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                router.push("/temperature")
            })
            .catch((error) => alert(error.message))
    }

    const signIn = async(email, password) => {
        await signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				setUser(userCredential.user);
				router.push("/temperature");
			})
			.catch((error) => {(error.code === "auth/wrong-password" ? alert("Wrong Password") : alert(error.code))})
    }

    const logOut = async() => {
        setUser({ email: null, uid: null })
        await signOut(auth)
            .then(router.push("/"))
            .catch((error) => alert(error.message))
    }

    return (
        <AuthContext.Provider value={{ user, signUp, signIn, logOut }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};