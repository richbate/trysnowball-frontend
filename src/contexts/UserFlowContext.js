import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const UserFlowContext = createContext();

export const useUserFlow = () => {
  const context = useContext(UserFlowContext);
  if (!context) {
    throw new Error('useUserFlow must be used within a UserFlowProvider');
  }
  return context;
};

export const UserFlowProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(() => {
    // Check if user has chosen demo mode
    return localStorage.getItem('trysnowball-demo') === 'true';
  });
  const [showAccountPrompt, setShowAccountPrompt] = useState(false);
  const [demoInteractions, setDemoInteractions] = useState(() => {
    // Track demo interactions for account prompts
    const saved = localStorage.getItem('trysnowball-demo-interactions');
    return saved ? JSON.parse(saved) : 0;
  });

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      
      // If user is authenticated, they're not in demo mode
      if (session?.user) {
        setIsDemo(false);
        localStorage.removeItem('trysnowball-demo');
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        
        // If user authenticates, exit demo mode
        if (session?.user) {
          setIsDemo(false);
          localStorage.removeItem('trysnowball-demo');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const startDemo = () => {
    setIsDemo(true);
    localStorage.setItem('trysnowball-demo', 'true');
    setDemoInteractions(0);
    localStorage.setItem('trysnowball-demo-interactions', '0');
  };

  const trackDemoInteraction = () => {
    if (isDemo) {
      const newCount = demoInteractions + 1;
      setDemoInteractions(newCount);
      localStorage.setItem('trysnowball-demo-interactions', newCount.toString());
      
      // Show account prompt after 3 interactions
      if (newCount >= 3 && !showAccountPrompt) {
        setShowAccountPrompt(true);
      }
    }
  };

  const dismissAccountPrompt = () => {
    setShowAccountPrompt(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    // Don't automatically start demo mode after logout
  };

  const migrateDataToAccount = async (userData) => {
    // This function would migrate localStorage data to the user's account
    // For now, we'll just clear demo state
    setIsDemo(false);
    setShowAccountPrompt(false);
    localStorage.removeItem('trysnowball-demo');
    localStorage.removeItem('trysnowball-demo-interactions');
  };

  const value = {
    user,
    loading,
    isDemo,
    showAccountPrompt,
    demoInteractions,
    startDemo,
    trackDemoInteraction,
    dismissAccountPrompt,
    signOut,
    migrateDataToAccount,
    // Helper computed values
    isAuthenticated: !!user,
    canSaveData: !!user, // Only authenticated users can save data
  };

  return (
    <UserFlowContext.Provider value={value}>
      {children}
    </UserFlowContext.Provider>
  );
};