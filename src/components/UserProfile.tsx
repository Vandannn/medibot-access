import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  FileText,
  Settings,
  Shield,
  Bell,
  Edit2,
  Save,
  Camera
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: string;
  bloodType: string;
  allergies: string;
  medications: string;
  medicalHistory: string;
}

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    address: "123 Main St, City, State 12345",
    emergencyContact: "Jane Doe - +1 (555) 987-6543",
    bloodType: "O+",
    allergies: "Penicillin, Nuts",
    medications: "Lisinopril 10mg daily",
    medicalHistory: "Hypertension diagnosed 2020"
  });
  const { toast } = useToast();

  const handleInputChange = (field: keyof UserData, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully."
    });
  };

  const mockAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "2024-01-20",
      time: "10:00 AM",
      status: "upcoming"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "General Practitioner",
      date: "2024-01-10",
      time: "2:30 PM",
      status: "completed"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                  {userData.firstName[0]}{userData.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-1 -right-1 rounded-full w-8 h-8 p-0"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-foreground">
                {userData.firstName} {userData.lastName}
              </h1>
              <p className="text-muted-foreground">{userData.email}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary">Patient ID: PT001234</Badge>
                <Badge variant="outline">Verified Account</Badge>
              </div>
            </div>
          </div>
          <Button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="flex items-center space-x-2"
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4" />
                <span>Edit Profile</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="medical">Medical</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Personal Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    First Name
                  </label>
                  {isEditing ? (
                    <Input
                      value={userData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-muted/30 rounded-md">{userData.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Last Name
                  </label>
                  {isEditing ? (
                    <Input
                      value={userData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-muted/30 rounded-md">{userData.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={userData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-muted/30 rounded-md">{userData.email}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <Input
                      value={userData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-muted/30 rounded-md">{userData.phone}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <Input
                      type="date"
                      value={userData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-muted/30 rounded-md">
                      {new Date(userData.dateOfBirth).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Emergency Contact
                  </label>
                  {isEditing ? (
                    <Input
                      value={userData.emergencyContact}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-muted/30 rounded-md">{userData.emergencyContact}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Address
                </label>
                {isEditing ? (
                  <Textarea
                    value={userData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="min-h-[80px]"
                  />
                ) : (
                  <p className="p-2 bg-muted/30 rounded-md">{userData.address}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Medical Information */}
        <TabsContent value="medical">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Medical Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Blood Type
                </label>
                {isEditing ? (
                  <Input
                    value={userData.bloodType}
                    onChange={(e) => handleInputChange('bloodType', e.target.value)}
                  />
                ) : (
                  <p className="p-2 bg-muted/30 rounded-md">{userData.bloodType}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Known Allergies
                </label>
                {isEditing ? (
                  <Textarea
                    value={userData.allergies}
                    onChange={(e) => handleInputChange('allergies', e.target.value)}
                    className="min-h-[80px]"
                  />
                ) : (
                  <p className="p-2 bg-muted/30 rounded-md">{userData.allergies}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Current Medications
                </label>
                {isEditing ? (
                  <Textarea
                    value={userData.medications}
                    onChange={(e) => handleInputChange('medications', e.target.value)}
                    className="min-h-[80px]"
                  />
                ) : (
                  <p className="p-2 bg-muted/30 rounded-md">{userData.medications}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Medical History
                </label>
                {isEditing ? (
                  <Textarea
                    value={userData.medicalHistory}
                    onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                    className="min-h-[100px]"
                  />
                ) : (
                  <p className="p-2 bg-muted/30 rounded-md">{userData.medicalHistory}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appointments */}
        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>My Appointments</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        appointment.status === 'upcoming' ? 'bg-primary' : 'bg-muted-foreground'
                      }`} />
                      <div>
                        <p className="font-medium">{appointment.doctor}</p>
                        <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{new Date(appointment.date).toLocaleDateString()}</p>
                      <p className="text-sm text-muted-foreground">{appointment.time}</p>
                    </div>
                    <Badge variant={appointment.status === 'upcoming' ? 'default' : 'secondary'}>
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive appointment reminders via email</p>
                  </div>
                  <input type="checkbox" defaultChecked className="toggle" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive appointment reminders via SMS</p>
                  </div>
                  <input type="checkbox" defaultChecked className="toggle" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Privacy & Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Download My Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;