const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testUpdatedSpeakers() {
  console.log('🔍 Testing updated speakers service logic...');
  
  try {
    // Test 1: Fetch all speakers with correct column names
    console.log('1️⃣ Testing speakers fetch with correct columns...');
    let query = supabase
      .from('speakers')
      .select('*');

    // Apply featured filter
    query = query.eq('featured', true);

    // Apply ordering
    query = query.order('order_index', { ascending: true });

    // Apply limit
    query = query.limit(4);

    const { data, error } = await query;

    if (error) {
      console.error('❌ Error fetching speakers:', error.message);
      console.error('Error details:', error);
    } else {
      console.log('✅ Successfully fetched speakers:', data.length);
      
      // Transform data to include legacy fields for backward compatibility
      const transformedSpeakers = (data || []).map(speaker => ({
        ...speaker,
        is_featured: speaker.featured,
        is_active: true, // All speakers are considered active
        display_order: speaker.order_index,
        linkedin_url: speaker.social_links?.linkedin,
        twitter_url: speaker.social_links?.twitter,
        website_url: speaker.social_links?.website,
      }));

      transformedSpeakers.forEach((speaker, index) => {
        console.log(`   ${index + 1}. ${speaker.name} - ${speaker.title} at ${speaker.company}`);
        console.log(`      Featured: ${speaker.is_featured}, Active: ${speaker.is_active}, Order: ${speaker.display_order}`);
        console.log(`      LinkedIn: ${speaker.linkedin_url || 'N/A'}, Twitter: ${speaker.twitter_url || 'N/A'}`);
      });
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testUpdatedSpeakers();
