import supabase from './supabaseClient.js';  

// Request a ride  
export const requestRide = async (req, res) => {  
  const { student_id, pickup_lat, pickup_lng, dropoff_lat, dropoff_lng } = req.body;  

  try {  
    const { data, error } = await supabase  
      .from('rides')  
      .insert({  
        student_id,  
        pickup_lat,  
        pickup_lng,  
        dropoff_lat,  
        dropoff_lng  
      })  
      .select()  
      .single();  

    if (error) throw error;  
    res.status(201).json(data);  

  } catch (error) {  
    res.status(500).json({ error: error.message });  
  }  
};  

// Accept a ride (called by rickshaw puller)  
export const acceptRide = async (req, res) => {  
  const { ride_id, rickshaw_puller_id } = req.body;  

  try {  
    const { data, error } = await supabase  
      .from('rides')  
      .update({  
        rickshaw_puller_id,  
        status: 'accepted'  
      })  
      .eq('id', ride_id)  
      .select()  
      .single();  

    if (error) throw error;  
    res.json(data);  

  } catch (error) {  
    res.status(500).json({ error: error.message });  
  }  
};  

// Complete a ride  
export const completeRide = async (req, res) => {  
  const { ride_id, fare } = req.body;  

  try {  
    const { data, error } = await supabase  
      .from('rides')  
      .update({  
        status: 'completed',  
        fare  
      })  
      .eq('id', ride_id)  
      .select()  
      .single();  

    if (error) throw error;  
    res.json(data);  

  } catch (error) {  
    res.status(500).json({ error: error.message });  
  }  
};  