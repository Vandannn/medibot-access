import { useState } from "react";
import Navigation from "@/components/Navigation";
import AIAssistant from "@/components/AIAssistant";
import DoctorListing from "@/components/DoctorListing";
import AppointmentBooking from "@/components/AppointmentBooking";
import VirtualConsultation from "@/components/VirtualConsultation";

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

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <AIAssistant />;
      case 'doctors':
        return <DoctorListing onBookAppointment={handleBookAppointment} />;
      case 'appointments':
        return <AppointmentBooking selectedDoctorId={selectedDoctorId} />;
      case 'consultations':
        return <VirtualConsultation />;
      default:
        return <AIAssistant />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary-soft/20">
      <Navigation activeSection={activeSection} onSectionChange={handleSectionChange} />
      <main className="relative">
        {renderActiveSection()}
      </main>
    </div>
  );
};

export default Index;
