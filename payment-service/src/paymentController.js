import supabase from './supabaseClient.js';  
import { v4 as uuidv4 } from 'uuid';  

// Mock payment processing  
export const processPayment = async (req, res) => {  
  const { user_id, amount, ride_id } = req.body;  

  try {  
    // 1. Create transaction record  
    const { data, error } = await supabase  
      .from('transactions')  
      .insert({  
        id: uuidv4(),  
        user_id,  
        amount,  
        status: 'completed',  // Mock success  
        ride_id  
      })  
      .select()  
      .single();  

    if (error) throw error;  

    // 2. Return mock payment confirmation  
    res.status(200).json({  
      transaction_id: data.id,  
      amount: data.amount,  
      status: data.status  
    });  

  } catch (error) {  
    res.status(500).json({ error: error.message });  
  }  
};  

// Get transaction history  
export const getTransactions = async (req, res) => {  
  const { user_id } = req.params;  

  try {  
    const { data, error } = await supabase  
      .from('transactions')  
      .select('*')  
      .eq('user_id', user_id);  

    if (error) throw error;  
    res.json(data);  

  } catch (error) {  
    res.status(500).json({ error: error.message });  
  }  
};  