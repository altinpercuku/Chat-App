import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://updxbumgmdwcudwdyubx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwZHhidW1nbWR3Y3Vkd2R5dWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1Nzk2MzgsImV4cCI6MjA3NTE1NTYzOH0.FT6EYHyqoEfrOZ9LyAeREshTI-2cu6t6JpQ3Mop0X84' // replace with your anon key
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ---------------- SIGN UP ----------------


export const signUp = async (username, email, password) => {
  try {
    // Step 1: Create user in Supabase Auth
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password })
    if (signUpError) throw signUpError

    const user = data.user || data.session?.user
    if (!user) throw new Error("No user returned after signup")

    console.log("Auth user created:", user)


    const { error: insertError } = await supabase
      .from('users')
      .insert([{
        id: user.id,
        username: username.toLowerCase(),
        email,
        name: "",
        avatar: "",
        bio: "You are using the ChatApp",
        lastseen: Date.now()  // this is bigint
      }])

    if (insertError) throw insertError

    alert("Account created successfully!")
    return true
  } catch (err) {
    console.error("Signup error:", err.message)
    alert(err.message)
    return false
  }
}


// ---------------- SIGN IN ----------------
export const signIn = async (email, password) => {
  try {
    // Login user
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error

    const user = data.user || data.session?.user
    if (!user) throw new Error("No user returned after login")

    console.log("Logged in user:", user)


    const { error: updateError } = await supabase
      .from('users')
      .update({ lastseen: Date.now() }) 
      .eq('id', user.id)

    if (updateError) console.error("Failed to update lastseen:", updateError.message)

    alert("Logged in successfully!")
    return true
  } catch (err) {
    console.error("Login error:", err.message)
    alert(err.message)
    return false
  }
}

// ---------------- GET CURRENT USER ----------------


export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) {
    console.error("Get current user error:", error.message)
    return null
  }
  return user
}
