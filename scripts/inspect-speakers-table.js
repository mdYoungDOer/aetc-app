const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectSpeakersTable() {
  console.log('🔍 Inspecting speakers table...');
  
  try {
    // Try to fetch all speakers without filters
    console.log('1️⃣ Fetching all speakers...');
    const { data: allSpeakers, error: allError } = await supabase
      .from('speakers')
      .select('*')
      .limit(5);

    if (allError) {
      console.error('❌ Error fetching all speakers:', allError.message);
      console.error('Error details:', allError);
    } else {
      console.log('✅ Successfully fetched speakers:', allSpeakers.length);
      if (allSpeakers.length > 0) {
        console.log('Sample speaker structure:');
        console.log(JSON.stringify(allSpeakers[0], null, 2));
      }
    }

    // Try to fetch just basic columns
    console.log('\n2️⃣ Fetching basic columns...');
    const { data: basicSpeakers, error: basicError } = await supabase
      .from('speakers')
      .select('id, name, title, company')
      .limit(3);

    if (basicError) {
      console.error('❌ Error fetching basic columns:', basicError.message);
    } else {
      console.log('✅ Successfully fetched basic columns:', basicSpeakers.length);
      basicSpeakers.forEach((speaker, index) => {
        console.log(`   ${index + 1}. ${speaker.name} - ${speaker.title} at ${speaker.company}`);
      });
    }

    // Try to count total speakers
    console.log('\n3️⃣ Counting total speakers...');
    const { count, error: countError } = await supabase
      .from('speakers')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('❌ Error counting speakers:', countError.message);
    } else {
      console.log('✅ Total speakers in database:', count);
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

inspectSpeakersTable();
