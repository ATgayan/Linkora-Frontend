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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUid(user.uid);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  

  const isOwnProfile = currentUid === profileUid;

  return isOwnProfile ? (
    <ProfileViewEnhanced />
  ) : (
    <OtherProfileView uid={profileUid} />
  );
}
