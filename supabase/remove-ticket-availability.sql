-- Remove ticket availability limitations
-- This script removes the 'available' column from the tickets table
-- since tickets are unlimited

-- First, check if the column exists
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'tickets' 
        AND column_name = 'available'
    ) THEN
        -- Drop the available column
        ALTER TABLE tickets DROP COLUMN available;
        RAISE NOTICE 'Removed available column from tickets table';
    ELSE
        RAISE NOTICE 'Available column does not exist in tickets table';
    END IF;
END $$;

-- Update any existing tickets to ensure they are active
UPDATE tickets SET active = true WHERE active IS NULL;

-- Add a comment to the table
COMMENT ON TABLE tickets IS 'Tickets table - no quantity limitations, all tickets are unlimited';
