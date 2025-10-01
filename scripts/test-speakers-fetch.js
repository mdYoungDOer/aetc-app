const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSpeakersFetch() {
  console.log('🔍 Testing speakers data fetching...');
  
  try {
    // Test 1: Fetch all active speakers (should work for anonymous users)
    console.log('1️⃣ Testing anonymous access to speakers...');
    const { data: speakers, error: speakersError } = await supabase
      .from('speakers')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (speakersError) {
      console.error('❌ Error fetching speakers:', speakersError.message);
      console.error('Error details:', speakersError);
    } else {
      console.log('✅ Successfully fetched speakers:', speakers.length);
      speakers.forEach((speaker, index) => {
        console.log(`   ${index + 1}. ${speaker.name} - ${speaker.title} at ${speaker.company}`);
      });
    }

    // Test 2: Fetch featured speakers
    console.log('\n2️⃣ Testing featured speakers fetch...');
    const { data: featuredSpeakers, error: featuredError } = await supabase
      .from('speakers')
      .select('*')
      .eq('is_featured', true)
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .limit(4);

    if (featuredError) {
      console.error('❌ Error fetching featured speakers:', featuredError.message);
    } else {
      console.log('✅ Successfully fetched featured speakers:', featuredSpeakers.length);
      featuredSpeakers.forEach((speaker, index) => {
        console.log(`   ${index + 1}. ${speaker.name} - ${speaker.title}`);
      });
    }

    // Test 3: Check RLS policies
    console.log('\n3️⃣ Testing RLS policies...');
    
    // Try to insert a speaker (should fail for anonymous users)
    const { error: insertError } = await supabase
      .from('speakers')
      .insert([{
        name: 'Test Speaker',
        title: 'Test Title',
        company: 'Test Company',
        is_featured: false,
        is_active: true,
        display_order: 999
      }]);

    if (insertError) {
      console.log('✅ RLS working: Insert blocked for anonymous user');
    } else {
      console.log('⚠️ RLS issue: Insert allowed for anonymous user');
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testSpeakersFetch();
