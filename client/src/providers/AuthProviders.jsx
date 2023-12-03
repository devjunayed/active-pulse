import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import PropTypes from 'prop-types';
import useAxiosPublic from "../hooks/useAxiosPublic";


export const AuthContext = createContext(null);

const AuthProviders = ({children}) => {

    const publicAxios = useAxiosPublic();

    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    const updateUserData = (name, photo) => {
        return updateProfile(auth.currentUser,{
            displayName: name,
            photoURL: photo
        })
    }


    
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if(currentUser){
                const userInfo = {email: currentUser.email};
                publicAxios.post('/jwt', userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                        setLoading(false);
                    }
                })

            }else{
                localStorage.removeItem('access-token');
                setLoading(false);
            }
        });

        return () => {
            unSubscribe();
        }
    }, []);

    const values = {
        user,
        createUser,
        loading,
        updateUserData,
        googleSignIn,
        logOut,
        signIn
    }

    
    return <AuthContext.Provider value={values}>
        {children}
    </AuthContext.Provider>
};

AuthProviders.propTypes = {
    children: PropTypes.node
}

export default AuthProviders;