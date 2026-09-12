-- Run this ONCE, right when you're ready to launch the badge system — not an ordinary schema
-- migration, and deliberately not part of schema.sql's history. Grants the founding badge to
-- every account that exists in the table AT THE MOMENT YOU RUN THIS — a one-time snapshot, not
-- an ongoing rule. Anyone who signs up after this point never gets it, which is the whole point
-- of a "founding" designation. Re-running this later is harmless (on conflict do nothing), but
-- running it for the first time any later than intended will incorrectly backdate newer accounts
-- as "founding" too — so run it once, deliberately, not as part of routine setup.

insert into public.badges (user_id, badge_key)
select id, 'founding_member'
from public.profiles
on conflict (user_id, badge_key) do nothing;
