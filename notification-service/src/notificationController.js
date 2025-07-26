import supabase from './supabaseClients.js';  
import { sendEmail } from './emailService.js';  

// Send notification  
export const sendNotification = async (req, res) => {  
  const { user_id, title, message } = req.body;  

  try {  
    // 1. Save to database  
    const { data, error } = await supabase  
      .from('notifications')  
      .insert({ user_id, title, message })  
      .select()  
      .single();  

    if (error) throw error;  

    // 2. Try to send email, but don't fail if it errors
    try {
      await sendEmail({  
        to: 'user@example.com',
        subject: title,  
        text: message  
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue execution - don't let email failure affect the API response
    }

    res.status(201).json(data);  

  } catch (error) {  
    res.status(500).json({ error: error.message });  
  }  
};  

// Fetch user notifications  
export const getNotifications = async (req, res) => {  
  const { user_id } = req.params;  

  try {  
    const { data, error } = await supabase  
      .from('notifications')  
      .select('*')  
      .eq('user_id', user_id)  
      .order('created_at', { ascending: false });  

    if (error) throw error;  
    res.json(data);  

  } catch (error) {  
    res.status(500).json({ error: error.message });  
  }  
};