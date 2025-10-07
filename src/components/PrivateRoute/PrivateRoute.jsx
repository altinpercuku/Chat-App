import React, { Children} from 'react'
// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";

const PrivateRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    getSession();

    // Listen for auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup listener
    return () => {
      subscription?.subscription?.unsubscribe();
    };
  }, []);

  if (loading) return <p>Loading...</p>;

  // If not logged in, redirect to login
  return session ? children : <Navigate to="/" />;
};

export default PrivateRoute;