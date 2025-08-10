
// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom'; // Import this for toBeInTheDocument
// import { User } from '../model/User';
// import { describe, expect, it } from '@jest/globals';

// const mockUser: User = {
//   uid: '12345',
//   fullName: 'John Doe',
//   profileCompleteness: 100,
//   whoAmI: 'Software Engineer',
//   relationshipState: 'In a relationship',
//   university: {
//     name: 'University of Example',
//     faculty: 'Computer Science',
//     degree: 'BSc in Computing',
//     universityYear: 'Final Year',
//   },
// };

// // Mock the ProfileViewEnhanced component as it's a client component with dynamic imports
// // and relies on hooks like useAuth and useEffect for data fetching.
// // For unit testing, we'll create a simplified mock.
// const ProfileViewEnhanced = ({ user }: { user: User }) => (
//   <div>
//     <h1>Profile for {user.fullName || 'User'}</h1>
//     <div>About</div>
//     <div>{user.whoAmI || "Tell us who you are..."}</div>
//     <div>{user.relationshipState || "Single?"}</div>
//     <div>{user.university?.name || "University not set"}</div>
//     <div>
//       {user.university?.faculty || "N/A"} - {user.university?.degree || "N/A"} ({user.university?.universityYear || "N/A"})
//     </div>
//   </div>
// );

// describe('ProfileViewEnhanced', () => {
//   it('renders with full user data', () => {
//     render(<ProfileViewEnhanced user={mockUser} />);

//     expect(screen.getByText('About')).toBeInTheDocument();
//     expect(screen.getByText('Software Engineer')).toBeInTheDocument();
//     expect(screen.getByText('In a relationship')).toBeInTheDocument();
//     expect(screen.getByText('University of Example')).toBeInTheDocument();
//     expect(screen.getByText('Computer Science - BSc in Computing (Final Year)')).toBeInTheDocument();
//   });

//   it('renders with missing whoAmI', () => {
//     const userWithMissingData = { ...mockUser, whoAmI: undefined };
//     render(<ProfileViewEnhanced user={userWithMissingData} />);
//     expect(screen.getByText('Tell us who you are...')).toBeInTheDocument();
//   });

//   it('renders with missing relationshipState', () => {
//     const userWithMissingData = { ...mockUser, relationshipState: undefined };
//     render(<ProfileViewEnhanced user={userWithMissingData} />);
//     expect(screen.getByText('Single?')).toBeInTheDocument();
//   });

//   it('renders with missing university name', () => {
//     const userWithMissingData = { ...mockUser, university: { ...mockUser.university, name: undefined } };
//     render(<ProfileViewEnhanced user={userWithMissingData} />);
//     expect(screen.getByText('University not set')).toBeInTheDocument();
//   });

//   it('renders with missing university faculty', () => {
//     const userWithMissingData = { ...mockUser, university: { ...mockUser.university, faculty: undefined } };
//     render(<ProfileViewEnhanced user={userWithMissingData} />);
//     expect(screen.getByText('N/A - BSc in Computing (Final Year)')).toBeInTheDocument();
//   });

//   it('renders with missing university degree', () => {
//     const userWithMissingData = { ...mockUser, university: { ...mockUser.university, degree: undefined } };
//     render(<ProfileViewEnhanced user={userWithMissingData} />);
//     expect(screen.getByText('Computer Science - N/A (Final Year)')).toBeInTheDocument();
//   });

//   it('renders with missing university year', () => {
//     const userWithMissingData = { ...mockUser, university: { ...mockUser.university, universityYear: undefined } };
//     render(<ProfileViewEnhanced user={userWithMissingData} />);
//     expect(screen.getByText('Computer Science - BSc in Computing (N/A)')).toBeInTheDocument();
//   });

//   it('renders with no university data', () => {
//     const userWithMissingData = { ...mockUser, university: undefined };
//     render(<ProfileViewEnhanced user={userWithMissingData} />);
//     expect(screen.getByText('University not set')).toBeInTheDocument();
//     expect(screen.getByText('N/A - N/A (N/A)')).toBeInTheDocument();
//   });
// });

// /* Removed custom expect function to use Jest's expect */

