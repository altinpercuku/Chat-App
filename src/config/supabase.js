
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://updxbumgmdwcudwdyubx.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwZHhidW1nbWR3Y3Vkd2R5dWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1Nzk2MzgsImV4cCI6MjA3NTE1NTYzOH0.FT6EYHyqoEfrOZ9LyAeREshTI-2cu6t6JpQ3Mop0X84"
const supabase = createClient(supabaseUrl, supabaseKey)


export const signUp = async (username, email, password) => {
  try {
    // Step 1: Create auth user
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signUpError) throw signUpError

    const user = data.user
    console.log("Auth user created:", user)

    // Step 2: Add user to "users" table
    const { error: insertError } = await supabase
      .from('users')
      .insert([{
        id: user.id,
        username: username.toLowerCase(),
        email,
        name: "",
        avatar: "",
        bio: "You are using the ChatApp",
        lastseen: Date.now()
      }])

    if (insertError) throw insertError

    console.log("User added to users table:", user.id)
    alert("Account created successfully!")

  } catch (err) {
    console.error("Signup error:", err.message)
    alert(err.message)
  }
}

export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error

    const user = data.user
    console.log("Logged in user:", user)

    // Update lastSeen timestamp in your database
    await supabase
      .from('users')
      .update({ lastSeen: Date.now() })
      .eq('id', user.id)

    alert("Logged in successfully!")
  } catch (err) {
    console.error("Login error:", err.message)
    alert(err.message)
  }
}