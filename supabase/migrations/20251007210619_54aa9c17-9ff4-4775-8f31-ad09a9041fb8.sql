-- Remove all database objects related to Dashboard and admin system

-- Drop RLS policies
DROP POLICY IF EXISTS "Anyone can insert contacts" ON public.contacts;
DROP POLICY IF EXISTS "Only admins can delete contacts" ON public.contacts;
DROP POLICY IF EXISTS "Only admins can view contacts" ON public.contacts;
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can create first admin" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

-- Drop tables
DROP TABLE IF EXISTS public.contacts CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;

-- Drop function
DROP FUNCTION IF EXISTS public.has_role(uuid, app_role);

-- Drop enum type
DROP TYPE IF EXISTS public.app_role CASCADE;