import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface UserData {
  // Profile data
  nama: string;
  email: string;
  no_hp: string | null;
  
  // User stats
  saldo_coin: number;
  total_botol: number;
  
  // Role
  role: 'teman' | 'mitra' | null;
}

export function useUserData() {
  const { user, userRole } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadUserData = async () => {
      if (!user) {
        setUserData(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('nama, email, no_hp')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        // Fetch user stats
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('saldo_coin, total_botol')
          .eq('id', user.id)
          .single();

        if (userError) throw userError;

        // Combine all data only if component is still mounted
        if (mounted) {
          setUserData({
            ...profileData,
            ...userData,
            role: userRole
          });
        }
      } catch (err: any) {
        console.error('Error fetching user data:', err);
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadUserData();

    return () => {
      mounted = false;
    };
  }, [user, userRole]);

  const refreshUserData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('nama, email, no_hp')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      // Fetch user stats
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('saldo_coin, total_botol')
        .eq('id', user.id)
        .single();

      if (userError) throw userError;

      // Combine all data
      setUserData({
        ...profileData,
        ...userData,
        role: userRole
      });
    } catch (err: any) {
      console.error('Error fetching user data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    userData,
    loading,
    error,
    refreshUserData
  };
}
