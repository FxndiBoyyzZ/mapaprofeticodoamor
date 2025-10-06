-- Create table for user contacts
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to view all contacts
-- For now, making it readable by authenticated users (you can restrict later)
CREATE POLICY "Authenticated users can view contacts"
ON public.contacts
FOR SELECT
TO authenticated
USING (true);

-- Allow anyone to insert contacts
CREATE POLICY "Anyone can insert contacts"
ON public.contacts
FOR INSERT
TO anon
WITH CHECK (true);

-- Create index for better performance
CREATE INDEX idx_contacts_created_at ON public.contacts(created_at DESC);