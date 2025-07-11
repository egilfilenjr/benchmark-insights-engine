-- Add unique constraint on user_id and provider to oauth_accounts table
-- This ensures each user can only have one account per provider
ALTER TABLE oauth_accounts 
ADD CONSTRAINT oauth_accounts_user_provider_unique 
UNIQUE (user_id, provider);