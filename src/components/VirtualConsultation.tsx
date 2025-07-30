import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Monitor, 
  Phone, 
  Settings,
  Clock,
  FileText,
  Download,
  AlertCircle,
  Camera,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ConsultationSession {
  id: string;
  doctorName: string;
  specialty: string;
  scheduledTime: string;
  duration: number;
  meetingLink: string;
  status: 'upcoming' | 'in-progress' | 'completed';
}

interface PreConsultationForm {
  chiefComplaint: string;
  symptomsDuration: string;
  painScale: string;
  medicalHistory: string;
  currentMedications: string;
  allergies: string;
  recentTests: string;
  additionalNotes: string;
}

const VirtualConsultation = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'consultation' | 'summary'>('upcoming');
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [consultationStarted, setConsultationStarted] = useState(false);
  const [preConsultationForm, setPreConsultationForm] = useState<PreConsultationForm>({
    chiefComplaint: '',
    symptomsDuration: '',
    painScale: '',
    medicalHistory: '',
    currentMedications: '',
    allergies: '',
    recentTests: '',
    additionalNotes: ''
  });
  const [formCompleted, setFormCompleted] = useState(false);
  const { toast } = useToast();

  // Mock consultation session
  const mockSession: ConsultationSession = {
    id: '1',
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    scheduledTime: '2024-01-15 14:30',
    duration: 30,
    meetingLink: 'https://meet.google.com/mock-meeting-link',
    status: 'upcoming'
  };

  const handleFormChange = (field: keyof PreConsultationForm, value: string) => {
    setPreConsultationForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!preConsultationForm.chiefComplaint || !preConsultationForm.symptomsDuration) {
      toast({
        variant: "destructive",
        title: "Incomplete Form",
        description: "Please fill in the required fields."
      });
      return;
    }

    setFormCompleted(true);
    toast({
      title: "Form Submitted",
      description: "Your pre-consultation information has been sent to the doctor."
    });
  };

  const startConsultation = () => {
    setConsultationStarted(true);
    setActiveTab('consultation');
    toast({
      title: "Consultation Started",
      description: "You have joined the virtual consultation room."
    });
  };

  const endConsultation = () => {
    setConsultationStarted(false);
    setActiveTab('summary');
    toast({
      title: "Consultation Ended",
      description: "Your consultation has been completed successfully."
    });
  };

  const toggleVideo = async () => {
    try {
      if (!isVideoOn) {
        // Request camera permission and start video
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setIsVideoOn(true);
        toast({
          title: "Camera On",
          description: "Your camera has been activated successfully."
        });
        // Store stream for later cleanup
        (window as any).currentVideoStream = stream;
      } else {
        // Stop video stream
        const stream = (window as any).currentVideoStream;
        if (stream) {
          stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
        }
        setIsVideoOn(false);
        toast({
          title: "Camera Off",
          description: "Your camera has been turned off."
        });
      }
    } catch (error) {
      console.error('Camera error:', error);
      toast({
        variant: "destructive",
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions and try again."
      });
    }
  };

  const toggleAudio = async () => {
    try {
      if (!isAudioOn) {
        // Request microphone permission and start audio
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsAudioOn(true);
        toast({
          title: "Microphone Unmuted",
          description: "Your microphone has been activated successfully."
        });
        // Store stream for later cleanup
        (window as any).currentAudioStream = stream;
      } else {
        // Stop audio stream
        const stream = (window as any).currentAudioStream;
        if (stream) {
          stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
        }
        setIsAudioOn(false);
        toast({
          title: "Microphone Muted",
          description: "Your microphone has been muted."
        });
      }
    } catch (error) {
      console.error('Microphone error:', error);
      toast({
        variant: "destructive",
        title: "Microphone Error",
        description: "Unable to access microphone. Please check permissions and try again."
      });
    }
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    toast({
      title: isScreenSharing ? "Screen Share Stopped" : "Screen Share Started",
      description: `Screen sharing has been ${isScreenSharing ? 'stopped' : 'started'}.`
    });
  };

  if (activeTab === 'consultation' && consultationStarted) {
    return (
      <div className="min-h-screen bg-background p-4">
        {/* Video Call Interface */}
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between bg-card border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="font-medium">Consultation with {mockSession.doctorName}</span>
              <Badge variant="secondary">{mockSession.specialty}</Badge>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>15:24 elapsed</span>
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {/* Doctor Video */}
            <Card className="aspect-video bg-gray-900 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                    <Camera className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <p className="font-medium">{mockSession.doctorName}</p>
                  <p className="text-sm opacity-75">{mockSession.specialty}</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4">
                <Badge className="bg-black/50 text-white">Doctor</Badge>
              </div>
            </Card>

            {/* Patient Video (You) */}
            <Card className="aspect-video bg-gray-900 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  {isVideoOn ? (
                    <>
                      <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-2">
                        <Camera className="w-8 h-8 text-secondary-foreground" />
                      </div>
                      <p className="font-medium">You</p>
                    </>
                  ) : (
                    <>
                      <VideoOff className="w-16 h-16 mx-auto mb-2 opacity-75" />
                      <p className="font-medium">Camera Off</p>
                    </>
                  )}
                </div>
              </div>
              <div className="absolute bottom-4 left-4">
                <Badge className="bg-black/50 text-white">You</Badge>
              </div>
              {!isAudioOn && (
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center">
                    <MicOff className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Button
              variant={isAudioOn ? "default" : "destructive"}
              size="lg"
              onClick={toggleAudio}
              className="rounded-full w-12 h-12 p-0"
            >
              {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </Button>

            <Button
              variant={isVideoOn ? "default" : "destructive"}
              size="lg"
              onClick={toggleVideo}
              className="rounded-full w-12 h-12 p-0"
            >
              {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </Button>

            <Button
              variant={isScreenSharing ? "secondary" : "outline"}
              size="lg"
              onClick={toggleScreenShare}
              className="rounded-full w-12 h-12 p-0"
            >
              <Monitor className="w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-full w-12 h-12 p-0"
            >
              <Settings className="w-5 h-5" />
            </Button>

            <Button
              variant="destructive"
              size="lg"
              onClick={endConsultation}
              className="rounded-full px-6"
            >
              <Phone className="w-5 h-5 mr-2" />
              End Call
            </Button>
          </div>

          {/* Chat/Notes Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Session Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 rounded-lg p-4 mb-4 h-32 overflow-y-auto">
                <p className="text-sm text-muted-foreground mb-2">
                  <span className="font-medium">14:30:</span> Consultation started
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  <span className="font-medium">14:32:</span> Reviewed patient symptoms
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">14:35:</span> Discussed treatment options
                </p>
              </div>
              <div className="flex space-x-2">
                <Input placeholder="Add a note..." className="flex-1" />
                <Button>Add Note</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (activeTab === 'summary') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">Consultation Summary</h1>
          <p className="text-muted-foreground">
            Your consultation with {mockSession.doctorName} has been completed.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="space-y-6">
          {/* Session Details */}
          <Card>
            <CardHeader>
              <CardTitle>Session Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Doctor:</span>
                  <p className="font-medium">{mockSession.doctorName}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Specialty:</span>
                  <p className="font-medium">{mockSession.specialty}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Date & Time:</span>
                  <p className="font-medium">January 15, 2024 at 2:30 PM</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Duration:</span>
                  <p className="font-medium">28 minutes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Diagnosis & Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Diagnosis & Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">Primary Diagnosis</h4>
                <p className="text-sm text-muted-foreground bg-muted/30 rounded-lg p-3">
                  Mild hypertension with lifestyle factors contributing to elevated blood pressure readings.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-2">Treatment Plan</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span>Begin low-sodium diet and increase physical activity to 150 minutes per week</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span>Monitor blood pressure daily for 2 weeks</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <span>Follow-up appointment in 4 weeks</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">Prescribed Medications</h4>
                <p className="text-sm text-muted-foreground bg-muted/30 rounded-lg p-3">
                  Lisinopril 10mg daily - Start tomorrow morning with food. Monitor for dizziness or dry cough.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Follow-up Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Follow-up Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
                  <div>
                    <p className="font-medium">When to Seek Immediate Care</p>
                    <p className="text-muted-foreground">
                      Contact emergency services if you experience chest pain, severe headache, or difficulty breathing.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Next Appointment</p>
                    <p className="text-muted-foreground">
                      Schedule a follow-up in 4 weeks to review blood pressure readings and medication effectiveness.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download Summary (PDF)</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Schedule Follow-up</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>View Prescription</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-foreground mb-2">Virtual Consultation</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Prepare for your upcoming consultation and complete the pre-visit questionnaire.
        </p>
      </div>

      {/* Upcoming Consultation */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Video className="w-5 h-5" />
            <span>Upcoming Consultation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-primary-soft rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Video className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{mockSession.doctorName}</h3>
                <p className="text-sm text-muted-foreground">{mockSession.specialty}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(mockSession.scheduledTime).toLocaleDateString()} at{' '}
                  {new Date(mockSession.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="font-medium">{mockSession.duration} minutes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pre-consultation Form */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Pre-Consultation Questionnaire</span>
            {formCompleted && (
              <Badge className="bg-success text-success-foreground">Completed</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Chief Complaint / Main Concern *
              </label>
              <Textarea
                value={preConsultationForm.chiefComplaint}
                onChange={(e) => handleFormChange('chiefComplaint', e.target.value)}
                placeholder="Briefly describe your main health concern or reason for the consultation"
                className="min-h-[80px]"
                required
                disabled={formCompleted}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  How long have you had these symptoms? *
                </label>
                <Select 
                  value={preConsultationForm.symptomsDuration}
                  onValueChange={(value) => handleFormChange('symptomsDuration', value)}
                  disabled={formCompleted}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less-than-day">Less than a day</SelectItem>
                    <SelectItem value="1-3-days">1-3 days</SelectItem>
                    <SelectItem value="1-week">About a week</SelectItem>
                    <SelectItem value="2-4-weeks">2-4 weeks</SelectItem>
                    <SelectItem value="1-3-months">1-3 months</SelectItem>
                    <SelectItem value="more-than-3-months">More than 3 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Pain Level (if applicable)
                </label>
                <Select 
                  value={preConsultationForm.painScale}
                  onValueChange={(value) => handleFormChange('painScale', value)}
                  disabled={formCompleted}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Rate pain 1-10" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1} {i === 0 && '- Minimal'} {i === 4 && '- Moderate'} {i === 9 && '- Severe'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Relevant Medical History
              </label>
              <Textarea
                value={preConsultationForm.medicalHistory}
                onChange={(e) => handleFormChange('medicalHistory', e.target.value)}
                placeholder="Previous surgeries, chronic conditions, family history relevant to your concern"
                className="min-h-[80px]"
                disabled={formCompleted}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Current Medications
                </label>
                <Textarea
                  value={preConsultationForm.currentMedications}
                  onChange={(e) => handleFormChange('currentMedications', e.target.value)}
                  placeholder="List all medications, supplements, and dosages"
                  className="min-h-[80px]"
                  disabled={formCompleted}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Known Allergies
                </label>
                <Textarea
                  value={preConsultationForm.allergies}
                  onChange={(e) => handleFormChange('allergies', e.target.value)}
                  placeholder="Drug allergies, food allergies, environmental allergies"
                  className="min-h-[80px]"
                  disabled={formCompleted}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Recent Tests or Lab Results
              </label>
              <Textarea
                value={preConsultationForm.recentTests}
                onChange={(e) => handleFormChange('recentTests', e.target.value)}
                placeholder="Any recent blood work, imaging, or other test results"
                className="min-h-[60px]"
                disabled={formCompleted}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Additional Notes
              </label>
              <Textarea
                value={preConsultationForm.additionalNotes}
                onChange={(e) => handleFormChange('additionalNotes', e.target.value)}
                placeholder="Anything else you'd like the doctor to know"
                className="min-h-[60px]"
                disabled={formCompleted}
              />
            </div>

            {!formCompleted && (
              <Button type="submit" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Submit Questionnaire
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Join Consultation */}
      <Card>
        <CardContent className="text-center p-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Video className="w-8 h-8 text-primary-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Join?</h3>
          <p className="text-muted-foreground mb-6">
            {formCompleted 
              ? "Your questionnaire is complete. You can now join the consultation room."
              : "Please complete the pre-consultation questionnaire before joining."
            }
          </p>
          <div className="space-y-3">
            <Button 
              size="lg" 
              onClick={startConsultation}
              disabled={!formCompleted}
              className="w-full md:w-auto px-8"
            >
              <Video className="w-4 h-4 mr-2" />
              Join Consultation
            </Button>
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span>Camera Ready</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span>Microphone Ready</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VirtualConsultation;