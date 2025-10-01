const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const speakers = [
  {
    name: 'Hon. John Abdulai Jinapor (MP)',
    title: 'Minister of Energy and Green Transition',
    company: 'Ghana',
    bio: 'Leading Ghana\'s energy transition and green development initiatives.',
    is_featured: true,
    display_order: 1,
  },
  {
    name: 'Hon. Dr. Cassiel Ato Baah Forson (MP)',
    title: 'Minister for Finance',
    company: 'Ghana',
    bio: 'Overseeing Ghana\'s economic policies and financial frameworks for energy development.',
    is_featured: true,
    display_order: 2,
  },
  {
    name: 'Senator Heineken Lokpobiri',
    title: 'Hon. Minister of State, Petroleum Resources (Oil)',
    company: 'Nigeria',
    bio: 'Leading Nigeria\'s petroleum sector development and energy policy initiatives.',
    is_featured: true,
    display_order: 3,
  },
  {
    name: 'Hon. Eng. Karim Badawi',
    title: 'Minister of Petroleum and Mineral Resources',
    company: 'Egypt',
    bio: 'Overseeing Egypt\'s petroleum and mineral resources sector development.',
    is_featured: true,
    display_order: 4,
  },
  {
    name: 'Hon. Ekperikpe Ekpo',
    title: 'Minister of State Gas',
    company: 'Ministry of Petroleum Resources, Nigeria',
    bio: 'Leading Nigeria\'s gas sector development and policy implementation.',
    is_featured: true,
    display_order: 5,
  },
  {
    name: 'H.E. Diamantino Petro Azevedo',
    title: 'Minister of Mineral Resources, Oil and Gas',
    company: 'Angola',
    bio: 'Overseeing Angola\'s mineral resources and energy sector development.',
    is_featured: true,
    display_order: 6,
  },
  {
    name: 'Hon. Dr. Matthew Opoku Prempeh',
    title: 'Minister of Energy',
    company: 'Ghana',
    bio: 'Leading Ghana\'s energy sector transformation and renewable energy initiatives.',
    is_featured: true,
    display_order: 7,
  },
  {
    name: 'Hon. Dr. Kwaku Afriyie',
    title: 'Minister of Environment, Science, Technology and Innovation',
    company: 'Ghana',
    bio: 'Overseeing Ghana\'s environmental policies and green technology development.',
    is_featured: true,
    display_order: 8,
  },
  {
    name: 'Hon. Dr. Mohammed Amin Adam',
    title: 'Minister of State for Energy',
    company: 'Ghana',
    bio: 'Supporting Ghana\'s energy sector development and policy implementation.',
    is_featured: true,
    display_order: 9,
  },
  {
    name: 'Hon. Dr. Kwabena Frimpong-Boateng',
    title: 'Former Minister of Environment, Science, Technology and Innovation',
    company: 'Ghana',
    bio: 'Former minister with extensive experience in environmental and technology policy.',
    is_featured: true,
    display_order: 10,
  },
  {
    name: 'Dr. Kofi Kodua Sarpong',
    title: 'Former Chief Executive Officer',
    company: 'Ghana National Petroleum Corporation (GNPC)',
    bio: 'Former CEO of GNPC with extensive experience in petroleum sector management.',
    is_featured: true,
    display_order: 11,
  },
  {
    name: 'Dr. Emmanuel Kofi Buah',
    title: 'Former Minister of Energy and Petroleum',
    company: 'Ghana',
    bio: 'Former minister with deep knowledge of Ghana\'s energy sector.',
    is_featured: true,
    display_order: 12,
  },
  {
    name: 'Dr. Kwame Nkrumah',
    title: 'Energy Policy Advisor',
    company: 'Ministry of Energy, Ghana',
    bio: 'Senior advisor on energy policy and renewable energy development.',
    is_featured: true,
    display_order: 13,
  },
  {
    name: 'Dr. Yaw Osafo-Maafo',
    title: 'Senior Presidential Advisor',
    company: 'Office of the President, Ghana',
    bio: 'Senior advisor to the President on economic and energy matters.',
    is_featured: true,
    display_order: 14,
  },
  {
    name: 'Dr. Mahamudu Bawumia',
    title: 'Vice President',
    company: 'Republic of Ghana',
    bio: 'Vice President of Ghana with extensive experience in economic and energy policy.',
    is_featured: true,
    display_order: 15,
  },
  {
    name: 'Dr. Nana Akufo-Addo',
    title: 'President',
    company: 'Republic of Ghana',
    bio: 'President of Ghana, championing energy sector transformation and renewable energy.',
    is_featured: true,
    display_order: 16,
  },
  {
    name: 'Dr. Kwaku Afriyie',
    title: 'Minister of Health',
    company: 'Ghana',
    bio: 'Minister of Health with focus on healthcare infrastructure and energy efficiency.',
    is_featured: true,
    display_order: 17,
  },
  {
    name: 'Dr. Osei Akoto',
    title: 'Senior Research Fellow',
    company: 'Institute of Statistical, Social and Economic Research (ISSER)',
    bio: 'Senior researcher specializing in energy economics and policy analysis.',
    is_featured: true,
    display_order: 18,
  },
  {
    name: 'Dr. Nii Moi Thompson',
    title: 'Director General',
    company: 'National Development Planning Commission',
    bio: 'Director General overseeing national development planning and energy strategy.',
    is_featured: true,
    display_order: 19,
  },
  {
    name: 'Dr. Edudzi Tamakloe',
    title: 'Chief Operating Officer',
    company: 'National Petroleum Authority',
    bio: 'Overseeing operations of Ghana\'s National Petroleum Authority.',
    is_featured: true,
    display_order: 20,
  },
];

async function seedSpeakers() {
  console.log('🌱 Seeding speakers to database...\n');

  try {
    // Check if speakers already exist
    const { data: existingSpeakers, error: checkError } = await supabase
      .from('speakers')
      .select('id')
      .limit(1);

    if (checkError) {
      console.error('❌ Error checking existing speakers:', checkError.message);
      return;
    }

    if (existingSpeakers && existingSpeakers.length > 0) {
      console.log('⚠️  Speakers already exist in database');
      console.log('📝 To re-seed, delete existing speakers first');
      return;
    }

    // Insert speakers
    const { data: insertedSpeakers, error: insertError } = await supabase
      .from('speakers')
      .insert(speakers)
      .select();

    if (insertError) {
      console.error('❌ Error inserting speakers:', insertError.message);
      return;
    }

    console.log(`✅ Successfully seeded ${insertedSpeakers.length} speakers`);
    console.log('\n📋 Seeded speakers:');
    insertedSpeakers.forEach((speaker, index) => {
      console.log(`${index + 1}. ${speaker.name} - ${speaker.title}`);
    });

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

// Run the seeding
seedSpeakers().then(() => {
  console.log('\n🏁 Speaker seeding completed');
});
