'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import dynamic from 'next/dynamic';

import { auth } from '@/lib/firebase';

// Lazy load components (optional for performance)
const ProfileViewEnhanced = dynamic(() => import('@/profile-view-enhanced'), {
  ssr: false,
});
const OtherProfileView = dynamic(() => import('@/other-profile-view'), {
  ssr: false,
});

export default function ProfilePage() {
  const params = useParams<{ Card: string }>();
  const profileUid = params.Card;
  const [currentUid, setCurrentUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        // Wait for auth state to be determined
        await new Promise<void>((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (isMounted) {
              if (user) {
                setCurrentUid(user.uid);
              }
              resolve();
            }
          });
        });

        // Optionally: fetch extra profile data here
        // Example:
        // const profileData = await getDoc(doc(db, 'users', profileUid));
        // console.log('Profile data:', profileData.data());

      } catch (err) {
        console.error('Error loading profile:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [profileUid]);

  if (loading) {
    return (
      null
    );
  }

  const isOwnProfile = currentUid === profileUid;

  return isOwnProfile ? (
    <ProfileViewEnhanced />
  ) : (
    <OtherProfileView uid={profileUid} />
  );
}
