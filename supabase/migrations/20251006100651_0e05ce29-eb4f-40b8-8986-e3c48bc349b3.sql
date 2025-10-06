-- Drop the restrictive admin policy for inserts
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;

-- Allow users to insert their own admin role if no admins exist yet
CREATE POLICY "Users can create first admin"
ON public.user_roles
FOR INSERT
WITH CHECK (
  auth.uid() = user_id 
  AND role = 'admin'
  AND NOT EXISTS (
    SELECT 1 FROM public.user_roles WHERE role = 'admin'
  )
);

-- Only existing admins can insert/update/delete other roles
CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));