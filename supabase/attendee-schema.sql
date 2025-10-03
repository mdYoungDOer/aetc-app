-- Attendee Information Schema for AETC 2026
-- This schema stores comprehensive information about each attendee for purchased tickets

-- Create attendees table
CREATE TABLE IF NOT EXISTS attendees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_ticket_id UUID NOT NULL REFERENCES user_tickets(id) ON DELETE CASCADE,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
  
  -- Personal Information
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  date_of_birth DATE,
  gender VARCHAR(20) CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  
  -- Professional Information
  job_title VARCHAR(200),
  company_name VARCHAR(200),
  industry VARCHAR(100),
  years_of_experience INTEGER,
  current_position VARCHAR(200),
  
  -- Contact Information
  address_line_1 VARCHAR(255),
  address_line_2 VARCHAR(255),
  city VARCHAR(100),
  state_province VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100) NOT NULL,
  
  -- Conference Specific Information
  dietary_requirements TEXT,
  accessibility_needs TEXT,
  emergency_contact_name VARCHAR(200),
  emergency_contact_phone VARCHAR(20),
  emergency_contact_relationship VARCHAR(100),
  
  -- Travel Information
  arrival_date DATE,
  departure_date DATE,
  accommodation_name VARCHAR(200),
  accommodation_address TEXT,
  flight_details TEXT,
  
  -- Professional Interests
  areas_of_interest TEXT[], -- Array of interest areas
  networking_goals TEXT,
  session_preferences TEXT,
  
  -- Additional Information
  t_shirt_size VARCHAR(10) CHECK (t_shirt_size IN ('XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL')),
  special_requests TEXT,
  how_did_you_hear_about_us VARCHAR(200),
  
  -- System Information
  form_completed_at TIMESTAMP WITH TIME ZONE,
  email_sent_at TIMESTAMP WITH TIME ZONE,
  is_verified BOOLEAN DEFAULT FALSE,
  verification_token VARCHAR(255),
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_attendees_user_ticket_id ON attendees(user_ticket_id);
CREATE INDEX IF NOT EXISTS idx_attendees_order_id ON attendees(order_id);
CREATE INDEX IF NOT EXISTS idx_attendees_email ON attendees(email);
CREATE INDEX IF NOT EXISTS idx_attendees_form_completed ON attendees(form_completed_at);
CREATE INDEX IF NOT EXISTS idx_attendees_verified ON attendees(is_verified);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_attendees_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_attendees_updated_at
  BEFORE UPDATE ON attendees
  FOR EACH ROW
  EXECUTE FUNCTION update_attendees_updated_at();

-- Add RLS (Row Level Security)
ALTER TABLE attendees ENABLE ROW LEVEL SECURITY;

-- Policy for users to manage their own attendees
CREATE POLICY "Users can manage their own attendees" ON attendees
  FOR ALL USING (
    order_id IN (
      SELECT id FROM orders WHERE user_id = auth.uid()
    )
  );

-- Policy for admins to view all attendees
CREATE POLICY "Admins can view all attendees" ON attendees
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('super_admin', 'admin')
    )
  );

-- Policy for admins to update attendees
CREATE POLICY "Admins can update all attendees" ON attendees
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM admin_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('super_admin', 'admin')
    )
  );

-- Add comments for documentation
COMMENT ON TABLE attendees IS 'Stores comprehensive attendee information for each purchased ticket';
COMMENT ON COLUMN attendees.user_ticket_id IS 'Reference to the user_tickets table';
COMMENT ON COLUMN attendees.order_id IS 'Reference to the orders table';
COMMENT ON COLUMN attendees.ticket_id IS 'Reference to the tickets table';
COMMENT ON COLUMN attendees.form_completed_at IS 'Timestamp when the attendee form was completed';
COMMENT ON COLUMN attendees.email_sent_at IS 'Timestamp when confirmation email was sent';
COMMENT ON COLUMN attendees.is_verified IS 'Whether the attendee information has been verified';
COMMENT ON COLUMN attendees.verification_token IS 'Token for email verification';
