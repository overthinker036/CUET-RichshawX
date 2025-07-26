import supabase from './supabaseClient.js';

// Register new user
export const registerUser = async (req, res) => {
  const { email, password, user_type, full_name, phone, student_id, vehicle_no } = req.body;

  // Validate user type
  if (!['student', 'rickshaw_puller'].includes(user_type)) {
    return res.status(400).json({ error: 'Invalid user type' });
  }

  try {
    // 1. Create auth user
    const { data: authUser, error: authError } = await supabase.auth.signUp({
      email,
      password
    });

    if (authError) throw authError;

    // 2. Save profile data
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authUser.user.id,
        user_type,
        full_name,
        phone,
        student_id: user_type === 'student' ? student_id : null,
        vehicle_no: user_type === 'rickshaw_puller' ? vehicle_no : null
      });

    if (profileError) throw profileError;

    res.status(201).json({
      id: authUser.user.id,
      email: authUser.user.email,
      user_type
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    res.json({
      access_token: data.session.access_token,
      user_id: data.user.id
    });
    
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

// Get user profile
export const getProfile = async (req, res) => {
  const userId = req.params.id;

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'User not found' });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};