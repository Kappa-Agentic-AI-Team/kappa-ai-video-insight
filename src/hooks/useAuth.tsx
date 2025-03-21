import { authApi } from '@/services/api';
import { useState, useEffect } from 'react';

export interface AuthState {
    id: number,
    username: string;
    password: string;
    image: string;
}

export const STORAGE_KEY = 'authState';

function getStoredAuth(): AuthState {
    // Check localStorage first (persistent storage)
    let storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
        try {
            return JSON.parse(storedData);
        } catch (e) {
            console.error('Error parsing localStorage auth data:', e);
        }
    }
    // Fallback to sessionStorage
    storedData = sessionStorage.getItem(STORAGE_KEY);
    if (storedData) {
        try {
            return JSON.parse(storedData);
        } catch (e) {
            console.error('Error parsing sessionStorage auth data:', e);
        }
    }
    return { id: NaN, username: '', password: '', image: ''};
}

export default function useAuth() {
    const [auth, setAuth] = useState<AuthState>(getStoredAuth);
    const api = authApi;

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
    }, [auth]);

    const login = async (username: string, password: string) => {
        const { response } = await api.login(username, password)
        const newAuth: AuthState = {id: response.user_id, username, password, image: '' };
        setAuth(newAuth);
    };

    const signup = async (username: string, password: string, name: string, image: string) => {
        const { response } = await api.register(username, password, name, image)
        const newAuth: AuthState = {id: response.user_id, username, password, image };
        setAuth(newAuth);
    };

    const logout = () => {
        setAuth({ username: '', id: NaN, password: '', image: '' });
        localStorage.removeItem(STORAGE_KEY);
    };

    return { auth, login, logout, signup };
}
