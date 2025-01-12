



// auth.tsx
import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { account, client } from './appwriteConfig';
import { ID, Models, Teams } from 'appwrite';
import conf from '../config/conf';

const teams = new Teams(client);
const ADMIN_TEAM_ID = conf.appwriteAdminTeamId;

interface User extends Models.User<Models.Preferences> {
    name: string;
    email: string;
    emailVerification: boolean;
    role: 'admin' | 'user';
}


interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name: string, role?: 'admin' | 'user') => Promise<void>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updateProfile: (name: string) => Promise<void>;
    sendVerificationEmail: () => Promise<void>;
    isAdmin: () => boolean;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    error: null,
    login: async () => {},
    signup: async () => {},
    logout: async () => {},
    resetPassword: async () => {},
    updateProfile: async () => {},
    sendVerificationEmail: async () => {},
    isAdmin: () => false,
    clearError: () => {}
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const checkAdminStatus = async (userId: string): Promise<boolean> => {
        try {
            // First verify team exists
            const teamsList = await teams.list();
            const adminTeam = teamsList.teams.find(team => team.$id === ADMIN_TEAM_ID);
            
            if (!adminTeam) {
                console.error('Admin team not found');
                return false;
            }
    
            // Check user membership
            const membershipList = await teams.listMemberships(ADMIN_TEAM_ID);
            return membershipList.memberships.some(membership => 
                membership.userId === userId && 
                membership.teamId === ADMIN_TEAM_ID &&
                membership.confirm
            );
        } catch (error) {
            console.error('Error checking admin status:', error);
            return false;
        }
    };

    const updateUserWithRole = async (currentUser: Models.User<Models.Preferences>) => {
        const isAdminUser = await checkAdminStatus(currentUser.$id);
        return {
            ...currentUser,
            role: isAdminUser ? 'admin' : 'user'
        } as User;
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const session = await account.get();
            const userWithRole = await updateUserWithRole(session);
            setUser(userWithRole);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

   // auth.tsx - Update login function with proper error handling and teams scope

const login = async (email: string, password: string) => {
    try {
        setLoading(true);
        setError(null);
        
        // Create email session
        await account.createEmailPasswordSession(email, password);
        
        // Get user details
        const currentUser = await account.get();
        
        try {
            // Check team membership with proper error handling
            const userWithRole = await updateUserWithRole(currentUser);
            setUser(userWithRole);

            if (!userWithRole.emailVerification) {
                navigate('/verify-email');
                return;
            }

            navigate(userWithRole.role === 'admin' ? '/admin/dashboard' : '/');
        } catch (teamError) {
            // Handle teams permission error gracefully
            console.warn('Unable to check admin status:', teamError);
            // Set as regular user if teams check fails
            setUser({
                ...currentUser,
                role: 'user'
            } as User);
            navigate('/');
        }
    } catch (error: any) {
        setError(error.message);
        throw error;
    } finally {
        setLoading(false);
    }
};

const signup = async (email: string, password: string, name: string, role: 'admin' | 'user' = 'user') => {
    try {
        setLoading(true);
        setError(null);
        
        // Create user first
        const newUser = await account.create(
            ID.unique(),
            email,
            password,
            name
        );

        // Create session
        await account.createEmailPasswordSession(email, password);

        if (role === 'admin') {
            try {
                // Add to admin team
                await teams.createMembership(
                    conf.appwriteAdminTeamId,
                    [newUser.$id],
                    'owner', // Give admin role in team
                    `${window.location.origin}/verify-admin`
                );
            } catch (teamError) {
                console.error('Failed to add user to admin team:', teamError);
                // Continue with regular user role
                role = 'user';
            }
        }

        const userWithRole = {
            ...newUser,
            role
        } as User;

        setUser(userWithRole);
        await sendVerificationEmail();
        
        navigate('/verify-email');
    } catch (error: any) {
        setError(error.message);
        throw error;
    } finally {
        setLoading(false);
    }
};
   
const logout = async () => {
    try {
        setLoading(true);
        setError(null);
        
        // Check if user is logged in first
        const currentSession = await account.getSession('current');
        if (!currentSession) {
            throw new Error('No active session');
        }

        await account.deleteSession('current');
        setUser(null);
        navigate('/login');
    } catch (error: any) {
        console.error('Logout error:', error);
        
        // Force client-side logout even if server request fails
        setUser(null);
        navigate('/login');
    } finally {
        setLoading(false);
    }
};

    const resetPassword = async (email: string) => {
        try {
            setLoading(true);
            setError(null);
            await account.createRecovery(email, `${window.location.origin}/reset-password`);
        } catch (error: any) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (name: string) => {
        try {
            setLoading(true);
            setError(null);
            const updatedUser = await account.updateName(name);
            setUser(await updateUserWithRole(updatedUser));
        } catch (error: any) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const sendVerificationEmail = async () => {
        try {
            setLoading(true);
            setError(null);
            await account.createVerification(`${window.location.origin}/verify-email`);
        } catch (error: any) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

     const isAdmin = () => user?.role === 'admin';

    const clearError = () => setError(null);

    const value :AuthContextType = {
        user,
        loading,
        error,
        login,
        signup,
        logout,
        resetPassword,
        updateProfile,
        sendVerificationEmail,
        isAdmin: () => user?.role === 'admin',
        clearError: () => setError(null)
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};