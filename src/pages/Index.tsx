import { useState } from "react";
import Navigation from "@/components/Navigation";
import AIAssistant from "@/components/AIAssistant";
import DoctorListing from "@/components/DoctorListing";
import AppointmentBooking from "@/components/AppointmentBooking";
import VirtualConsultation from "@/components/VirtualConsultation";
import UserProfile from "@/components/UserProfile";

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | undefined>();

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const handleBookAppointment = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
    setActiveSection('appointments');
  };

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
    setActiveSection('appointments');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary-soft/20">
      {/* Navigation */}
      <Navigation activeSection={activeSection} onSectionChange={handleSectionChange} />
      
      {/* Main Content */}
      <main className="min-h-screen bg-background">
        {activeSection === 'home' && <AIAssistant />}
        {activeSection === 'doctors' && <DoctorListing onDoctorSelect={handleDoctorSelect} />}
        {activeSection === 'appointments' && (
          <AppointmentBooking selectedDoctorId={selectedDoctorId} />
        )}
        {activeSection === 'consultations' && <VirtualConsultation />}
        {activeSection === 'profile' && <UserProfile />}
      </main>
    </div>
  );

};

export default Index;
