import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendGridService } from '@/lib/sendgrid';
import { cleanEmailTemplates } from '@/lib/email-templates-clean';
import { randomBytes } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const body = await request.json();
    
    const {
      userTicketId,
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      gender,
      jobTitle,
      companyName,
      industry,
      yearsOfExperience,
      currentPosition,
      addressLine1,
      addressLine2,
      city,
      stateProvince,
      postalCode,
      country,
      dietaryRequirements,
      accessibilityNeeds,
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactRelationship,
      arrivalDate,
      departureDate,
      accommodationName,
      accommodationAddress,
      flightDetails,
      areasOfInterest,
      networkingGoals,
      sessionPreferences,
      tShirtSize,
      specialRequests,
      howDidYouHearAboutUs,
    } = body;

    // Validate required fields
    if (!userTicketId || !firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get user ticket information
    const { data: userTicket, error: ticketError } = await supabase
      .from('user_tickets')
      .select(`
        *,
        orders!inner(
          id,
          user_id,
          ticket_id,
          tickets!inner(
            id,
            name,
            type,
            price
          )
        )
      `)
      .eq('id', userTicketId)
      .single();

    if (ticketError || !userTicket) {
      return NextResponse.json(
        { error: 'User ticket not found' },
        { status: 404 }
      );
    }

    // Check if attendee information already exists
    const { data: existingAttendee } = await supabase
      .from('attendees')
      .select('id')
      .eq('user_ticket_id', userTicketId)
      .single();

    if (existingAttendee) {
      return NextResponse.json(
        { error: 'Attendee information already submitted for this ticket' },
        { status: 400 }
      );
    }

    // Generate verification token
    const verificationToken = randomBytes(32).toString('hex');

    // Create attendee record
    const { data: attendee, error: attendeeError } = await supabase
      .from('attendees')
      .insert([
        {
          user_ticket_id: userTicketId,
          order_id: userTicket.orders.id,
          ticket_id: userTicket.orders.ticket_id,
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
          date_of_birth: dateOfBirth,
          gender: gender,
          job_title: jobTitle,
          company_name: companyName,
          industry: industry,
          years_of_experience: yearsOfExperience,
          current_position: currentPosition,
          address_line_1: addressLine1,
          address_line_2: addressLine2,
          city: city,
          state_province: stateProvince,
          postal_code: postalCode,
          country: country,
          dietary_requirements: dietaryRequirements,
          accessibility_needs: accessibilityNeeds,
          emergency_contact_name: emergencyContactName,
          emergency_contact_phone: emergencyContactPhone,
          emergency_contact_relationship: emergencyContactRelationship,
          arrival_date: arrivalDate,
          departure_date: departureDate,
          accommodation_name: accommodationName,
          accommodation_address: accommodationAddress,
          flight_details: flightDetails,
          areas_of_interest: areasOfInterest,
          networking_goals: networkingGoals,
          session_preferences: sessionPreferences,
          t_shirt_size: tShirtSize,
          special_requests: specialRequests,
          how_did_you_hear_about_us: howDidYouHearAboutUs,
          form_completed_at: new Date().toISOString(),
          verification_token: verificationToken,
        },
      ])
      .select()
      .single();

    if (attendeeError) {
      console.error('Error creating attendee:', attendeeError);
      return NextResponse.json(
        { error: 'Failed to save attendee information' },
        { status: 500 }
      );
    }

    // Send confirmation email to attendee
    try {
      const attendeeEmailHtml = cleanEmailTemplates.attendeeConfirmation({
        attendeeName: `${firstName} ${lastName}`,
        attendeeEmail: email,
        ticketName: userTicket.orders.tickets.name,
        ticketType: userTicket.orders.tickets.type,
        conferenceDate: 'March 2026', // You can make this dynamic
        conferenceVenue: 'Labadi Beach Hotel, Accra, Ghana',
        verificationToken: verificationToken,
        loginUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://aetc.africa'}/my-tickets`,
      });

      await sendGridService.sendEmail({
        to: email,
        subject: 'Your AETC 2026 Attendee Information Confirmation',
        html: attendeeEmailHtml,
      });

      // Update email_sent_at timestamp
      await supabase
        .from('attendees')
        .update({ email_sent_at: new Date().toISOString() })
        .eq('id', attendee.id);

    } catch (emailError) {
      console.error('Error sending attendee confirmation email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Attendee information submitted successfully',
      attendeeId: attendee.id,
    });

  } catch (error) {
    console.error('Error in attendees API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { searchParams } = new URL(request.url);
    const userTicketId = searchParams.get('userTicketId');

    if (!userTicketId) {
      return NextResponse.json(
        { error: 'User ticket ID is required' },
        { status: 400 }
      );
    }

    // Get attendee information
    const { data: attendee, error } = await supabase
      .from('attendees')
      .select('*')
      .eq('user_ticket_id', userTicketId)
      .single();

    if (error || !attendee) {
      return NextResponse.json(
        { error: 'Attendee information not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ attendee });

  } catch (error) {
    console.error('Error fetching attendee information:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
